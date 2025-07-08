package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.Model.Batch;
import com.example.demo.Model.Course;
import com.example.demo.Model.Student;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.AdminRepo;
import com.example.demo.Repo.BatchRepo;
import com.example.demo.Repo.CourseRepo;
import com.example.demo.Repo.StudentRepo;
import com.example.demo.Repo.TrainerRepo;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginRegisterController {

    @Autowired private StudentRepo studentRepo;
    @Autowired private TrainerRepo trainerRepo;
    @Autowired private AdminRepo adminRepo;
    @Autowired private CourseRepo courseRepo;
    @Autowired private BatchRepo batchRepo;


    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String role = req.getRole();
        String email = req.getEmail();
        String password = req.getPassword();

        System.out.println("LOGIN REQUEST: " + email + " | " + password + " | " + role);

        if ("Admin".equalsIgnoreCase(role)) {
            return adminRepo.login(email, password)
                    .map(admin -> {
                        System.out.println("✅ Admin login success");
                        return ResponseEntity.ok("Admin login success");
                    })
                    .orElseGet(() -> {
                        System.out.println("❌ Admin login failed");
                        return ResponseEntity.status(401).body("Invalid credentials");
                    });
        }
        
        if ("Trainer".equalsIgnoreCase(role)) {
            return trainerRepo.login(email, password)
                    .map(trainer -> {
                        System.out.println("✅ Trainer login success");
                        return ResponseEntity.ok("Trainer login success");
                    })
                    .orElseGet(() -> {
                        System.out.println("❌ Trainer login failed");
                        return ResponseEntity.status(401).body("Invalid credentials");
                    });
        }
        
        if ("Student".equalsIgnoreCase(role)) {
            return studentRepo.login(email, password)
                    .map(student -> {
                        System.out.println("✅ Student login success");
                        return ResponseEntity.ok("Student login success");
                    })
                    .orElseGet(() -> {
                        System.out.println("❌ Student login failed");
                        return ResponseEntity.status(401).body("Invalid credentials");
                    });
        }



        // You can add Student & Trainer login below when needed
        return ResponseEntity.status(400).body("Invalid role selected");
    }




@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    Course course = courseRepo.findById(request.getCourseId()).orElse(null);
    Batch batch = batchRepo.findById(request.getBatchId()).orElse(null);

    if (course == null || batch == null) {
        return ResponseEntity.badRequest().body("Invalid course or batch selection.");
    }
    System.out.println("Register request: " + request);
    
    if ("Student".equalsIgnoreCase(request.getRole())) {
        if (studentRepo.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPassword(request.getPassword());
        student.setBatch(batch);
        student.setCourse(course);

        studentRepo.save(student);
        return ResponseEntity.ok("Student registered successfully!");
    }

    if ("Trainer".equalsIgnoreCase(request.getRole())) {
        if (trainerRepo.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Trainer trainer = new Trainer();
        trainer.setName(request.getName());
        trainer.setEmail(request.getEmail());
        trainer.setPassword(request.getPassword());
        trainer.setBatch(batch);
        trainer.setCourse(course);

        trainerRepo.save(trainer);
        return ResponseEntity.ok("Trainer registered successfully!");
    }

    return ResponseEntity.badRequest().body("Invalid role");
}
}








