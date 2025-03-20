package com.product.app.service;

import com.product.app.dto.UserDTO;
import com.product.app.model.Role;
import com.product.app.model.User;
import com.product.app.repositories.RoleRepository;
import com.product.app.repositories.UserRepository;
import com.product.app.utils.EncryptPasswordUtil;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User createUser(User userDto) {
        User user = User.builder().username(userDto.getUsername())
                .password(EncryptPasswordUtil
                        .encryptPassword(userDto.getPassword()))
                .build();
        userDto.setPassword(EncryptPasswordUtil.encryptPassword(userDto.getPassword()));
        Role role = roleRepository.findByName("USER").orElseThrow(() -> new RuntimeException("Role not found !"));
        user.setRoles(Collections.singleton(role));
        return userRepository.save(user);
    }

}
