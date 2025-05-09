package com.product.app.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.app.model.Product;
import com.product.app.service.FileStorageService;
import com.product.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private ProductService productService;
    private FileStorageService fileStorageService;
    private ObjectMapper mapper;

    @Autowired
    public ProductController(ProductService productService,
                             FileStorageService fileStorageService,
                             ObjectMapper mapper){
        this.productService = productService;
        this.fileStorageService = fileStorageService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<Product> getAll(){
        return productService.getAllProducts();
    }
    @PostMapping
    public ResponseEntity<String> createProduct(@RequestParam("product") String product,
                                                @RequestParam("imageFile") MultipartFile file) throws IOException {
        Product productRequest = mapper.readValue(product, Product.class);
        String imageUrl = fileStorageService.storeFile(file);
        productRequest.setImageUrl(imageUrl);
        productService.createOrUpdateProduct(productRequest);
        return ResponseEntity.ok("Create product successfully !");
    }

    @PutMapping
    public ResponseEntity<String> updateProduct(@RequestParam("product") String product,
                                                @RequestParam(value = "imageFile", required = false) MultipartFile file) throws IOException {
        Product productRequest = mapper.readValue(product, Product.class);
        productRequest.setUpdateAt(LocalDateTime.now());
        productRequest.setImageUrl(productService.findProduct(productRequest.getId()).getImageUrl());
        if(file != null){
            productRequest.setImageUrl(productService.findProduct(productRequest.getId()).getImageUrl());
            String imageUrl = fileStorageService.storeFile(file);
            productRequest.setImageUrl(imageUrl);
        }
        productService.createOrUpdateProduct(productRequest);
        return ResponseEntity.ok("Update product successfully !");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id){
        productService.deleteProduct(id);
        return ResponseEntity.ok("Delete product successfully !");
    }

}
