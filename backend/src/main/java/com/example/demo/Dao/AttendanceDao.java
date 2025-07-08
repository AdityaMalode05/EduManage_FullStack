package com.example.demo.Dao;

import com.example.demo.Model.Attendance;
import com.example.demo.Repo.AttendanceRepo;
import com.example.demo.Services.AttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceDao implements AttendanceService {

    @Autowired
    private AttendanceRepo repo;

    @Override
    public Attendance save(Attendance a) {
        return repo.save(a);
    }

    @Override
    public List<Attendance> getByBatchId(int batchId) {
        return repo.findByBatchId(batchId);
    }

    @Override
    public List<Attendance> getByStudentAndBatch(int studentId, int batchId) {
        return repo.findByStudentIdAndBatchId(studentId, batchId);
    }
    
    @Override
    public List<Attendance> getAttendanceByBatchId(int batchId) {
        return repo.findByBatchIdOrderByDateDesc(batchId);
    }
    
    @Override
    public List<Attendance> getByStudentId(int studentId) {
        return repo.findByStudentId(studentId);
    }


}
