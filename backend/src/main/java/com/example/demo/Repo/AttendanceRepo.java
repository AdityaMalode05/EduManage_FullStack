package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByBatchId(int batchId);
    List<Attendance> findByStudentIdAndBatchId(int studentId, int batchId);
    List<Attendance> findByBatchIdOrderByDateDesc(int batchId);
    
    @Query("SELECT COALESCE(COUNT(a), 0) FROM Attendance a WHERE a.student.id = :studentId AND a.batch.id = :batchId")
    int getTotalMarkedSessions(@Param("studentId") int studentId, @Param("batchId") int batchId);

    @Query("SELECT COALESCE(COUNT(a), 0) FROM Attendance a WHERE a.student.id = :studentId AND a.batch.id = :batchId AND a.present = true")
    int getPresentSessions(@Param("studentId") int studentId, @Param("batchId") int batchId);
    
    List<Attendance> findByStudentId(int studentId);

    
}