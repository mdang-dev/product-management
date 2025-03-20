package com.product.app.utils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.product.app.exceptions.UserNotFoundException;
import com.product.app.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    @Value("${signer_key}")
    private String signerKey;

    @Autowired
    private UserRepository userRepository;

    public String generateToken(String username) throws JOSEException {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found !"));

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("products.com")
                .jwtID(UUID.randomUUID().toString())
                .issueTime(new Date())
                .expirationTime(
                        new Date(Instant.now().plus(7, ChronoUnit.DAYS).toEpochMilli())
                )
                .build();
        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        jwsObject.sign(new MACSigner(signerKey.getBytes()));
        return jwsObject.serialize();
    }

    public boolean validToken(String token) throws ParseException, JOSEException {
        if (token == null) return false;
        SignedJWT signed = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(signerKey);
        Date expirationTime = signed.getJWTClaimsSet().getExpirationTime();
        return signed.verify(verifier) && expirationTime.after(new Date());
    }

    public String getTokenFromRequest(HttpServletRequest request){
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        return authHeader.substring(7);
    }

    public String extractUsername(String token) throws KeyLengthException, ParseException {
        SignedJWT signed = SignedJWT.parse(token);
        return signed.getJWTClaimsSet().getSubject();
    }


}
