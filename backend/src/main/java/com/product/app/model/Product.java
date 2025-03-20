package com.product.app.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String description;

    String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    Integer quantity;

    @Column(nullable = false)
    Double price;

    @Builder.Default
    LocalDateTime createAt = LocalDateTime.now();

    LocalDateTime updateAt;

}
