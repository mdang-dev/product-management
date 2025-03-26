package com.product.app.service;

import com.product.app.model.Product;
import com.product.app.model.User;
import com.product.app.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>(productRepository.findAll());
        Collections.reverse(products);
        return products;
    }

    public Product createOrUpdateProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(String id){
        productRepository.delete(productRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Product Not Found !")));
    }

    public Product findProduct(String id){
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product Not Found !"));
    }

}
