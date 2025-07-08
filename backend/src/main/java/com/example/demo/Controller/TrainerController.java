package com.example.demo.Controller;

import com.example.demo.Model.Batch;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.TrainerRepo;
import com.example.demo.Services.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin("http://localhost:4200")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;
    
    @Autowired
    private TrainerRepo trainerRepo;

    @PostMapping("/register")
    public ResponseEntity<Trainer> register(@RequestBody Trainer t) {
        return ResponseEntity.ok(trainerService.save(t));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Trainer>> getAll() {
        return ResponseEntity.ok(trainerService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getById(@PathVariable int id) {
        return ResponseEntity.ok(trainerService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Trainer> update(@PathVariable int id, @RequestBody Trainer updated) {
        Trainer t = trainerService.getById(id);
        if (t == null) return ResponseEntity.notFound().build();

        t.setName(updated.getName());
        t.setEmail(updated.getEmail());
        t.setPassword(updated.getPassword());
        t.setCourse(updated.getCourse());
        t.setBatch(updated.getBatch());

        return ResponseEntity.ok(trainerService.save(t));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        trainerService.delete(id);
        return ResponseEntity.ok("Deleted");
    }
    
    
    
   // Trainer-Dashboard //
    
    
    @GetMapping("/trainer-dashboard/batches/{email}")
    public ResponseEntity<List<Batch>> getBatchesForTrainer(@PathVariable String email) {
    	
        List<Batch> batches = trainerService.getBatchesByTrainerEmail(email);
        return ResponseEntity.ok(batches);
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Trainer> getTrainerByEmail(@PathVariable String email) {
        Trainer trainer = trainerRepo.findByEmail(email).orElse(null);
        return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
    }

    @GetMapping("/Email/{email}")
    public ResponseEntity<Trainer> getByEmail(@PathVariable String email) {
        return trainerRepo.findByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    
    
    
    
}
