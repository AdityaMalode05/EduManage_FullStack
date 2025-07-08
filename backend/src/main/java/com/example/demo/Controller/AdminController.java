package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.RecentActivityDTO;
import com.example.demo.Model.Student;
import com.example.demo.Model.Trainer;
import com.example.demo.Repo.AdminRepo;
import com.example.demo.Repo.BatchRepo;
import com.example.demo.Repo.CourseRepo;
import com.example.demo.Repo.StudentRepo;
import com.example.demo.Repo.TrainerRepo;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class AdminController {
	
	@Autowired
	AdminRepo adminRepo;
    @Autowired 
    private StudentRepo studentRepo;
    @Autowired 
    private TrainerRepo trainerRepo;
    @Autowired 
    private CourseRepo courseRepo;
    @Autowired 
    private BatchRepo batchRepo;

    @GetMapping("/summary")
    public Map<String, Long> getSummary() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("students", studentRepo.count());
        counts.put("trainers", trainerRepo.count());
        counts.put("courses", courseRepo.count());
        counts.put("batches", batchRepo.count());
        return counts;
    }
    
    @GetMapping("/role-counts")
    public ResponseEntity<Map<String, Integer>> getRoleCounts() {
        Map<String, Integer> counts = new HashMap<>();
        counts.put("admins", adminRepo.findAll().size());
        counts.put("trainers", trainerRepo.findAll().size());
        counts.put("students", studentRepo.findAll().size());
        return ResponseEntity.ok(counts);
   }
    
    @GetMapping("/recent-activity")
    public ResponseEntity<List<RecentActivityDTO>> getRecentActivity() {
        // ✅ Use only latest 5 students & trainers
        List<Student> students = studentRepo.findTop5ByOrderByIdDesc();
        List<Trainer> trainers = trainerRepo.findTop5ByOrderByIdDesc();

        List<RecentActivityDTO> activities = new ArrayList<>();

        for (Student s : students) {
            String message = "Student " + s.getName() + " (" + s.getEmail() + ") has registered";
            activities.add(new RecentActivityDTO(message, "Student", s.getId()));
        }

        for (Trainer t : trainers) {
            String message = "Trainer " + t.getName() + " (" + t.getEmail() + ") has registered";
            activities.add(new RecentActivityDTO(message, "Trainer", t.getId()));
        }

        // ✅ Sort by ID descending (newest on top)
        activities.sort((a, b) -> Integer.compare(b.getId(), a.getId()));

        return ResponseEntity.ok(activities);
    }





}
