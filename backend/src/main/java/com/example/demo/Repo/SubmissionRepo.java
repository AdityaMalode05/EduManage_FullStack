package com.example.demo.Repo;

import com.example.demo.Model.Submission;
import com.example.demo.Model.Student;
import com.example.demo.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubmissionRepo extends JpaRepository<Submission, Integer> {
    List<Submission> findByTaskId(int taskId);
    List<Submission> findByStudentId(int studentId);
    Submission findByStudentAndTask(Student student, Task task);
    
    @Query("SELECT s FROM Submission s WHERE s.task.trainer.id = :trainerId")
    List<Submission> findByTrainerId(@Param("trainerId") int trainerId);

}
