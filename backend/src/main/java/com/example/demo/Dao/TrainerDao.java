package com.example.demo.Dao;

import com.example.demo.Model.Batch;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.TrainerRepo;
import com.example.demo.Services.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainerDao implements TrainerService {

    @Autowired
    private TrainerRepo repo;

    @Override
    public Trainer save(Trainer t) {
        return repo.save(t);
    }

    @Override
    public List<Trainer> getAll() {
        return repo.findAll();
    }

    @Override
    public Trainer getById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        repo.deleteById(id);
    }
    

    @Override
    public List<Batch> getBatchesByTrainerEmail(String email) {
        Trainer trainer = repo.fetchByEmailIgnoreCase(email).orElse(null);
        List<Batch> batches = new ArrayList<>();

        if (trainer != null && trainer.getBatch() != null) {
            batches.add(trainer.getBatch());
        }

        return batches;
    }

    
}
