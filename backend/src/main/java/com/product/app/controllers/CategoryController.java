package com.product.app.controllers;

import com.product.app.model.Category;
import com.product.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories(){
        return categoryService.getCategories();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category){
       return categoryService.createOrCategory(category);
    }

    @PutMapping
    public Category update(@RequestBody Category category){
        return categoryService.createOrCategory(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
        return ResponseEntity.status(200).body("Delete category successfully !");
    }

}
