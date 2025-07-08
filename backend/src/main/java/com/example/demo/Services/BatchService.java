package com.example.demo.Services;

import com.example.demo.Model.Batch;
import java.util.List;

public interface BatchService {
    Batch save(Batch b);
    List<Batch> getAll();
    Batch getById(int id);
    void delete(int id);
}
