import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentSidebarComponent } from '../../../components/shared/student-sidebar/student-sidebar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, StudentSidebarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent implements OnInit {
  showLogoutModal = false;
  studentName: string = 'Student';
  batchName: string = '';
  courseName: string = '';
  upcomingTasksCount: number = 0;
  attendancePercentage: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.showLogoutModal = false;
  }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.studentName = user?.name || 'Student';
    const email = user?.email;

    if (email) {
      this.http
        .get<any>(`http://localhost:8080/api/students/email/${email}`)
        .subscribe((student) => {
          this.studentName = student.name || 'Student';
          this.batchName = student.batch?.name || 'No Batch Assigned';
          this.courseName = student.course?.name || 'No Course Assigned';

          this.http
            .get<any[]>(
              `http://localhost:8080/api/tasks/batch/${student.batch.id}`
            )
            .subscribe((tasks) => {
              const today = new Date();
              this.upcomingTasksCount = tasks.filter(
                (t) => new Date(t.dueDate) >= today
              ).length;
            });

          this.http
            .get<any>(
              `http://localhost:8080/api/attendance/percentage/student/${student.id}/batch/${student.batch.id}`
            )
            .subscribe((percent) => {
              this.attendancePercentage = Math.round(percent);
            });
        });
    }
  }
}
