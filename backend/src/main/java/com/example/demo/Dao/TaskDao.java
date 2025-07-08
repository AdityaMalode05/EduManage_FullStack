package com.example.demo.Dao;

import com.example.demo.Model.Task;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.TaskRepo;
import com.example.demo.Repo.TrainerRepo;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskDao implements TaskService {

    @Autowired
    private TaskRepo repo;

    @Autowired
    private TrainerRepo trainerRepo;
    
    @Override
    public Task save(Task task) {
        return repo.save(task);
    }

    @Override
    public List<Task> getTasksByBatch(int batchId) {
        return repo.findByBatchId(batchId);
    }
    
    @Override
    public List<Task> getTasksByTrainerEmail(String email) {
        Trainer trainer = trainerRepo.findByEmail(email).orElse(null);
        if (trainer != null) {
            return repo.findByTrainer(trainer);
        }
        return new ArrayList<>();
    }
}
