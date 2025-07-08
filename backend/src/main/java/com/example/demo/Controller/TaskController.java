package com.example.demo.Controller;

import com.example.demo.Model.Task;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.TaskRepo;
import com.example.demo.Repo.TrainerRepo;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService service;
    
    @Autowired
    private TaskRepo repo;
    
    @Autowired
    private TrainerRepo trainerRepo;

    @PostMapping("/assign")
    public ResponseEntity<Task> assignTask(@RequestBody Task task, @RequestParam String trainerEmail) {
        Trainer trainer = trainerRepo.findByEmail(trainerEmail).orElse(null);
        if (trainer == null) {
            return ResponseEntity.badRequest().build();
        }

        task.setTrainer(trainer); // 🔥 This is the key fix
        return ResponseEntity.ok(service.save(task));
    }



    
    @GetMapping("/trainer/{email}")
    public ResponseEntity<List<Task>> getTasksByTrainer(@PathVariable String email) {
        List<Task> tasks = repo.findByTrainerEmail(email);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<Task>> getTasksByBatchId(@PathVariable int batchId) {
        return ResponseEntity.ok(service.getTasksByBatch(batchId));
    }




}
