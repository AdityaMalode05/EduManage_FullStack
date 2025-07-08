package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Course;
import com.example.demo.Services.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("http://localhost:4200")

public class CourseController {

	@Autowired
    private CourseService courseService;

	@PostMapping("/register")
    public ResponseEntity<Course> register(@RequestBody Course c) {
        return ResponseEntity.ok(courseService.save(c));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAll() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getById(@PathVariable int id) {
        return ResponseEntity.ok(courseService.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
    	courseService.delete(id);
        return ResponseEntity.ok("Deleted");
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Course> updateTrainer(@PathVariable int id, @RequestBody Course updatedCourse) {
        Course course = courseService.getById(id);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        course.setName(updatedCourse.getName());

        courseService.save(course);
        return ResponseEntity.ok(course);
    }

	
}
