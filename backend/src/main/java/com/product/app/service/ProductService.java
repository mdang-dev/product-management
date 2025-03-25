package com.product.app.service;

import com.product.app.model.Product;
import com.product.app.model.User;
import com.product.app.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return  productRepository.findAll();
    }

    public Product createOrUpdateProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(String id){
        productRepository.delete(productRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Product Not Found !")));
    }

}
