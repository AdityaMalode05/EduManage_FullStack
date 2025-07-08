package com.example.demo.Services;

import com.example.demo.Model.Attendance;
import java.util.List;

public interface AttendanceService {
    Attendance save(Attendance a);
    List<Attendance> getByBatchId(int batchId);
    List<Attendance> getByStudentAndBatch(int studentId, int batchId);
    List<Attendance> getAttendanceByBatchId(int batchId);
    List<Attendance> getByStudentId(int studentId);


}
