package com.example.demo.Dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repo.StudentRepo;
import com.example.demo.Services.StudentService;

@Service
public class StudentDao implements StudentService {

	@Autowired
    private StudentRepo repo;

    @Override
    public Student save(Student s) {
        return repo.save(s);
    }

    @Override
    public List<Student> getAll() {
        return repo.findAll();
    }

    @Override
    public Student getById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        repo.deleteById(id);
    }
    
    @Override
    public Student getStudentByEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }


}
