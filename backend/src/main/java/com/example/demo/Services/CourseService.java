package com.example.demo.Services;

import java.util.List;

import com.example.demo.Model.Course;

public interface CourseService {
	Course save(Course c);
    List<Course> getAll();
    Course getById(int id);
    void delete(int id);

}
