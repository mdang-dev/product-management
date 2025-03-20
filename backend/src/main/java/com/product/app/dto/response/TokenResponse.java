package com.product.app.dto.response;

import lombok.Data;

@Data
public class TokenResponse {
    String token;

    public TokenResponse(String token) {
        this.token = token;
    }
}
