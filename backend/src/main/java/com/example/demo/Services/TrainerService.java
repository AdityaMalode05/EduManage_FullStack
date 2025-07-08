package com.example.demo.Services;

import com.example.demo.Model.Batch;
import com.example.demo.Model.Trainer;
import java.util.List;

public interface TrainerService {
    Trainer save(Trainer t);
    List<Trainer> getAll();
    Trainer getById(int id);
    void delete(int id);
    List<Batch> getBatchesByTrainerEmail(String email);

    
    
}
