package com.product.app.controllers;

import com.nimbusds.jose.JOSEException;
import com.product.app.dto.UserLoginDto;
import com.product.app.dto.response.TokenResponse;
import com.product.app.exceptions.UserNotFoundException;
import com.product.app.model.User;
import com.product.app.repositories.UserRepository;
import com.product.app.service.AuthService;
import com.product.app.service.UserService;
import com.product.app.utils.EncryptPasswordUtil;
import com.product.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private AuthService authService;
    private final String URI = "/api/auth";

    @Autowired
    public AuthController(UserService userService, UserRepository userRepository,
                          AuthenticationManager authenticationManager, JwtUtil jwtUtil, AuthService authService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @PostMapping(URI + "/login")
    public Object login(@RequestBody UserLoginDto userLoginDto) throws JOSEException {
        Authentication authentication;
        User user = userRepository.findByUsername(userLoginDto.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found !"));
        if (userLoginDto.getUsername().equals(user.getUsername())
                && EncryptPasswordUtil.isMatchesPassword(user.getPassword(), userLoginDto.getPassword())) {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginDto.getUsername(), userLoginDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String tokenGenerated = jwtUtil.generateToken(userLoginDto.getUsername());
            authService.saveUserToken(user, tokenGenerated);

            return ResponseEntity.status(HttpStatus.OK).body(new TokenResponse(tokenGenerated));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password !");
    }

    @PostMapping(URI + "/register")
    public ResponseEntity<String> register(@RequestBody User userDto) {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            return new ResponseEntity<>("Email is taken !", HttpStatus.BAD_REQUEST);
        }else {
            userService.createUser(userDto);
            return new ResponseEntity<>("Register successfully !", HttpStatus.CREATED);
        }
    }

    @GetMapping("/users/refresh")
    public ResponseEntity<Object> refreshToken() throws JOSEException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found !"));
        String token = jwtUtil.generateToken(username);
        authService.saveUserToken(user, token);
        return ResponseEntity.status(200).body(new TokenResponse(token));
    }

}
