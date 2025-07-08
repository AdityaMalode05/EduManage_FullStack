package com.example.demo.Dao;

import com.example.demo.Model.Submission;
import com.example.demo.Repo.SubmissionRepo;
import com.example.demo.Services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionDao implements SubmissionService {

    @Autowired
    private SubmissionRepo repo;

    @Override
    public Submission save(Submission submission) {
        return repo.save(submission);
    }

    @Override
    public List<Submission> getSubmissionsByTask(int taskId) {
        return repo.findByTaskId(taskId);
    }

    @Override
    public List<Submission> getSubmissionsByStudent(int studentId) {
        return repo.findByStudentId(studentId);
    }
    
    @Override
    public Submission getById(int id) {
        return repo.findById(id).orElse(null);
    }
    
    @Override
    public List<Submission> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Submission> getSubmissionsByTrainer(int trainerId) {
        return repo.findByTrainerId(trainerId);
    }


}
