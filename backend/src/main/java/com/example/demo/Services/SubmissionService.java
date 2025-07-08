package com.example.demo.Services;

import com.example.demo.Model.Submission;
import java.util.List;

public interface SubmissionService {
    Submission save(Submission submission);
    List<Submission> getSubmissionsByTask(int taskId);
    List<Submission> getSubmissionsByStudent(int studentId);
    Submission getById(int id);
    List<Submission> getAll();
    List<Submission> getSubmissionsByTrainer(int trainerId);


}
