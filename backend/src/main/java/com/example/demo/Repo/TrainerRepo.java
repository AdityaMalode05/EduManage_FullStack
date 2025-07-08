package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Trainer;

public interface TrainerRepo extends JpaRepository<Trainer, Integer> {
    Optional<Trainer> findByEmailAndPassword(String email, String password);
    
    @Query("SELECT a FROM Trainer a WHERE LOWER(a.email) = LOWER(:email) AND a.password = :password")
    Optional<Trainer> login(@Param("email") String email, @Param("password") String password);

    Optional<Trainer> findByEmail(String email);
    
    List<Trainer> findTop5ByOrderByIdDesc();
    
    @Query("SELECT t FROM Trainer t WHERE LOWER(t.email) = LOWER(:email)")
    Optional<Trainer> fetchByEmailIgnoreCase(@Param("email") String email);


    
  

}

