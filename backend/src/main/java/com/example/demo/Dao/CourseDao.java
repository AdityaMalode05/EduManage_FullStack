package com.example.demo.Dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Course;
import com.example.demo.Repo.CourseRepo;
import com.example.demo.Services.CourseService;

@Service
public class CourseDao implements CourseService {

	@Autowired
    private CourseRepo repo;
	
	@Override
	public Course save(Course c) {
        return repo.save(c);
	}

	@Override
	public List<Course> getAll() {
        return repo.findAll();
	}

	@Override
	public Course getById(int id) {
		return repo.findById(id).orElse(null);
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

}
