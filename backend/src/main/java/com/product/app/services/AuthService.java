package com.product.app.service;

import com.product.app.model.Token;
import com.product.app.model.User;
import com.product.app.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private TokenRepository tokenRepository;

    public void saveUserToken(User user, String jwtToken) {
        revokeAllUserTokens(user);
        Token token = Token.builder().user(user).token(jwtToken).expired(false).revoked(false).build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

}
