package com.example.demo.Services;

import com.example.demo.Model.Task;
import java.util.List;

public interface TaskService {
    Task save(Task task);
    List<Task> getTasksByBatch(int batchId);
    List<Task> getTasksByTrainerEmail(String email);

}
