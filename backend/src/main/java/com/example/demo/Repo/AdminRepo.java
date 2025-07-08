package com.example.demo.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmailAndPassword(String email, String password);

    @Query("SELECT a FROM Admin a WHERE LOWER(a.email) = LOWER(:email) AND a.password = :password")
    Optional<Admin> login(@Param("email") String email, @Param("password") String password);

	
}
