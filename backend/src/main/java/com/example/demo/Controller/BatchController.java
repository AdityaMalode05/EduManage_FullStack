package com.example.demo.Controller;

import com.example.demo.Model.Batch;
import com.example.demo.Services.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin("http://localhost:4200")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping("/add")
    public ResponseEntity<Batch> addBatch(@RequestBody Batch batch) {
        return ResponseEntity.ok(batchService.save(batch));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Batch>> getAllBatches() {
        return ResponseEntity.ok(batchService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable int id) {
        return ResponseEntity.ok(batchService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable int id, @RequestBody Batch updated) {
        Batch b = batchService.getById(id);
        if (b == null) return ResponseEntity.notFound().build();

        b.setName(updated.getName());
        return ResponseEntity.ok(batchService.save(b));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBatch(@PathVariable int id) {
        batchService.delete(id);
        return ResponseEntity.ok("Batch deleted");
    }
}
