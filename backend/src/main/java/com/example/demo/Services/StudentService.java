package com.example.demo.Services;

import java.util.List;

import com.example.demo.Model.Student;

public interface StudentService {
    Student save(Student s);
    List<Student> getAll();
    Student getById(int id);
    void delete(int id);
    Student getStudentByEmail(String email);

}

