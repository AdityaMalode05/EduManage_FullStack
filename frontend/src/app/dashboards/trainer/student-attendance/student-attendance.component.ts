import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../models/batch';
import { Student } from '../../../models/student';
import { Trainer } from '../../../models/trainer';
import { TrainerService } from '../../../services/trainer.service';
import { HttpClient } from '@angular/common/http';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-attendance',
  imports: [TrainerSidebarComponent, CommonModule],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.css',
})
export class StudentAttendanceComponent implements OnInit {
  batches: Batch[] = [];
  selectedBatchId: number = 0;
  students: Student[] = [];
  trainer!: Trainer;

  constructor(private trainerService: TrainerService, private http: HttpClient) {}

  ngOnInit() {
    const email = localStorage.getItem('trainerEmail');

    if (email) {
      // Get trainer profile first
      this.http.get<Trainer>(`http://localhost:8080/api/trainers/email/${email}`).subscribe((trainerData) => {
        this.trainer = trainerData;

        // Get batches after trainer is loaded
        this.trainerService.getTrainerBatches(email).subscribe((b) => {
          this.batches = b;
          if (b.length > 0) {
            this.selectedBatchId = b[0].id!;
            this.students = b[0].students || [];
          }
        });
      });
    }
  }

  markAttendance(studentId: number, present: boolean) {
    const attendance = {
      date: new Date(),
      present,
      student: { id: studentId },
      batch: { id: this.selectedBatchId },
      trainer: { id: this.trainer.id } // ✅ Include trainer info
    };

    console.log('📌 Marking attendance:', attendance);

    this.http.post('http://localhost:8080/api/attendance/mark', attendance).subscribe(() => {
      alert('Attendance marked!');
    });
  }
}
