package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.example.demo.Model.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    Optional<Student> findByEmailAndPassword(String email, String password);
    
    @Query("SELECT a FROM Student a WHERE LOWER(a.email) = LOWER(:email) AND a.password = :password")
    Optional<Student> login(@Param("email") String email, @Param("password") String password);

    Optional<Student> findByEmail(String email);
    
    List<Student> findTop5ByOrderByIdDesc();

    @Query("SELECT s FROM Student s WHERE LOWER(s.email) = LOWER(:email)")
    Optional<Student> findByEmailIgnoreCase(@Param("email") String email);


}

