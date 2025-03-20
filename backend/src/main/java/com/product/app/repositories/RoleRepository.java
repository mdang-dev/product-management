package com.product.app.repositories;

import com.product.app.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository {

    Optional<Role> findByName(String name);

}
