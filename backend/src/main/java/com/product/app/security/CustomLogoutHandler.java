package com.product.app.security;

import com.product.app.repositories.TokenRepository;
import com.product.app.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    private JwtUtil jwtUtil;
    private TokenRepository tokenRepository;

    @Autowired
    public CustomLogoutHandler(JwtUtil jwtUtil,
                               TokenRepository tokenRepository) {
        this.jwtUtil = jwtUtil;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String token = jwtUtil.getTokenFromRequest(request);
        if(!StringUtils.hasText(token)){
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        }
        var tokenStored = tokenRepository.findByToken(token).orElse(null);
        if(tokenStored != null){
            tokenStored.setExpired(false);
            tokenStored.setRevoked(false);
            tokenRepository.save(tokenStored);
        }
    }
}
