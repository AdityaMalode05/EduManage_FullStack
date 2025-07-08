package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Attendance;
import com.example.demo.Repo.AttendanceRepo;
import com.example.demo.Services.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("http://localhost:4200")
public class AttendanceController {

    @Autowired
    private AttendanceService service;
    
    @Autowired
    private AttendanceRepo repo;

    @PostMapping("/mark")
    public ResponseEntity<Attendance> markAttendance(@RequestBody Attendance a) {
        if (a.getTrainer() == null || a.getTrainer().getId() == 0) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok(service.save(a));
    }


    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<Attendance>> getByBatch(@PathVariable int batchId) {
        return ResponseEntity.ok(service.getByBatchId(batchId));
    }

    @GetMapping("/student/{studentId}/batch/{batchId}")
    public ResponseEntity<List<Attendance>> getByStudentAndBatch(@PathVariable int studentId, @PathVariable int batchId) {
        return ResponseEntity.ok(service.getByStudentAndBatch(studentId, batchId));
    }
    
    @GetMapping("/view/{batchId}")
    public ResponseEntity<List<Attendance>> getAttendanceByBatch(@PathVariable int batchId) {
        return ResponseEntity.ok(service.getAttendanceByBatchId(batchId));
    }
    
    @GetMapping("/percentage/student/{studentId}/batch/{batchId}")
    public ResponseEntity<Double> getAttendancePercentage(@PathVariable int studentId, @PathVariable int batchId) {
        int total = repo.getTotalMarkedSessions(studentId, batchId);
        int present = repo.getPresentSessions(studentId, batchId);
        double percentage = total > 0 ? ((double) present / total) * 100 : 0;
        return ResponseEntity.ok(percentage);
    }
    
    @GetMapping("/student/{id}")
    public ResponseEntity<List<Attendance>> getByStudentId(@PathVariable int id) {
        return ResponseEntity.ok(service.getByStudentId(id));
    }



}
