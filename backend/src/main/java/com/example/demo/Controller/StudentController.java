package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Student;
import com.example.demo.Repo.StudentRepo;
import com.example.demo.Services.StudentService;


@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private StudentRepo repo;

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.save(student));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAll() {
        List<Student> students = studentService.getAll();
        return ResponseEntity.ok(students);
    }




    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable int id) {
        Student student = studentService.getById(id);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        studentService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        Student existingStudent = studentService.getById(id);
        if (existingStudent == null) return ResponseEntity.notFound().build();

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPassword(updatedStudent.getPassword());
        existingStudent.setCourse(updatedStudent.getCourse());
        existingStudent.setBatch(updatedStudent.getBatch());

        Student saved = studentService.save(existingStudent);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getByEmail(@PathVariable String email) {
        Student student = repo.findByEmailIgnoreCase(email).orElse(null);
        if (student == null) return ResponseEntity.notFound().build();

        student.getBatch().getName(); 
        student.getCourse().getName(); 

        return ResponseEntity.ok(student);
    }

    
}
