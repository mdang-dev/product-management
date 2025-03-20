package com.product.app.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tokens")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;

    @Column(nullable = false)
    String token;

    @Column(nullable = false)
    Boolean expired;

    @Column(nullable = false)
    Boolean revoked;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

}
