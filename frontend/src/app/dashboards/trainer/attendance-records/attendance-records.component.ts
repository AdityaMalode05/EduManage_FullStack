import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainerService } from '../../../services/trainer.service';
import { CommonModule } from '@angular/common';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';

@Component({
  selector: 'app-attendance-records',
  standalone: true,
  imports: [CommonModule, TrainerSidebarComponent],
  templateUrl: './attendance-records.component.html',
  styleUrls: ['./attendance-records.component.css']
})
export class AttendanceRecordsComponent implements OnInit {
  batchId = 0;
  records: any[] = [];

  constructor(private ts: TrainerService, private http: HttpClient) {}

  ngOnInit(): void {
    const email = localStorage.getItem('trainerEmail');
    if (email) {
      this.ts.getTrainerBatches(email).subscribe((b) => {
        if (b.length > 0) {
          this.batchId = b[0].id!;
          this.loadAttendance();
        }
      });
    }
  }

  loadAttendance() {
    this.http.get(`http://localhost:8080/api/attendance/view/${this.batchId}`).subscribe((data: any) => {
      this.records = data;
    });
  }
}
