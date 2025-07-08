package com.example.demo.Dao;

import com.example.demo.Model.Batch;
import com.example.demo.Repo.BatchRepo;
import com.example.demo.Services.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchDao implements BatchService {

    @Autowired
    private BatchRepo batchRepo;

    @Override
    public Batch save(Batch b) {
        return batchRepo.save(b);
    }

    @Override
    public List<Batch> getAll() {
        return batchRepo.findAll();
    }

    @Override
    public Batch getById(int id) {
        return batchRepo.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        batchRepo.deleteById(id);
    }
}
