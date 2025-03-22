package com.product.app.service;

import com.product.app.exceptions.CategoryNotFoundException;
import com.product.app.model.Category;
import com.product.app.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    public Category createOrCategory(Category category){
       return categoryRepository.save(category);
    }

    public void deleteCategory(String id){
        var category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));
        categoryRepository.delete(category);
    }

}
