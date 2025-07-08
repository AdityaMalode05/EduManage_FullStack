package com.example.demo.Repo;

import com.example.demo.Model.Task;
import com.example.demo.Model.Trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task, Integer> {
    List<Task> findByBatchId(int batchId);
    List<Task> findByTrainer(Trainer trainer);
    @Query("SELECT t FROM Task t WHERE LOWER(t.trainer.email) = LOWER(:email)")
    List<Task> findByTrainerEmail(@Param("email") String email);


}
