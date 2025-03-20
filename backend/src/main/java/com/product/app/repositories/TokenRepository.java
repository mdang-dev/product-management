package com.product.app.repositories;

import com.product.app.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {


    @Query("""
			 SELECT t FROM Token t INNER JOIN User u ON t.user.id = u.id WHERE u.id =:userId
			 AND (t.expired = false OR t.revoked = false)
			""")
    List<Token> findAllValidTokensByUser(@Param("userId") String userId);

    Optional<Token> findByToken(String token);

}
