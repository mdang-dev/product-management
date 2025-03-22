package com.product.app.dto.request;

import com.product.app.model.Category;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    String id;
    String name;
    String description;
    String imageUrl;
    String categoryId;
    Integer quantity;
    Double price;
    LocalDateTime createAt = LocalDateTime.now();
    LocalDateTime updateAt;
}
