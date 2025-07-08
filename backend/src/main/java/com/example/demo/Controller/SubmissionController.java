package com.example.demo.Controller;

import com.example.demo.Model.Submission;
import com.example.demo.Services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;


@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:4200")
public class SubmissionController {

    @Autowired
    private SubmissionService service;

    @PostMapping("/submit")
    public ResponseEntity<Submission> submitTask(@RequestBody Submission submission) {
        submission.setSubmissionDate(java.time.LocalDate.now());
        return ResponseEntity.ok(service.save(submission));
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getSubmissionsByTask(@PathVariable int taskId) {
        return ResponseEntity.ok(service.getSubmissionsByTask(taskId));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Submission>> getSubmissionsByStudent(@PathVariable int studentId) {
        return ResponseEntity.ok(service.getSubmissionsByStudent(studentId));
    }
    
    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(
        @RequestParam("file") MultipartFile file,
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("submittedDate") String submittedDate,
        @RequestParam("studentId") int studentId,
        @RequestParam("taskId") int taskId
    )
 {
        try {             
            // 1. Save the file to a directory
            String uploadDir = "uploads/";
            java.io.File dir = new java.io.File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir + fileName);
            java.nio.file.Files.write(filePath, file.getBytes());

            // 2. Create and save Submission metadata
            Submission submission = new Submission();
            submission.setTitle(title);
            submission.setDescription(description);
            submission.setSubmissionDate(java.time.LocalDate.parse(submittedDate));
            submission.setFilePath(fileName); // Ensure Submission entity has this field

            // Link Student and Task
            com.example.demo.Model.Student student = new com.example.demo.Model.Student();
            student.setId(studentId);
            submission.setStudent(student);

            com.example.demo.Model.Task task = new com.example.demo.Model.Task();
            task.setId(taskId);
            submission.setTask(task);

            Submission saved = service.save(submission);

            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }
    
    @PutMapping("/grade/{submissionId}")
    public ResponseEntity<Submission> gradeSubmission(
        @PathVariable int submissionId,
        @RequestParam String grade,
        @RequestParam(required = false) String feedback) {
        
        Submission submission = service.getById(submissionId);
        if (submission == null) return ResponseEntity.notFound().build();

        submission.setGrade(grade);
        if (feedback != null) submission.setFeedback(feedback);
        return ResponseEntity.ok(service.save(submission));
    }			

    @GetMapping("/all")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<Submission>> getSubmissionsByTrainer(@PathVariable int trainerId) {
        return ResponseEntity.ok(service.getSubmissionsByTrainer(trainerId));
    }



}
