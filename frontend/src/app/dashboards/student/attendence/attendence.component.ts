import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentSidebarComponent } from '../../../components/shared/student-sidebar/student-sidebar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendence',
   standalone: true,
  imports: [CommonModule, StudentSidebarComponent],
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css'
})
export class AttendenceComponent implements OnInit  {
  attendanceList: any[] = [];

  constructor(private http: HttpClient) {}

  
  ngOnInit(): void {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  if (user?.email) {
    this.http.get<any>(`http://localhost:8080/api/students/email/${user.email}`).subscribe(student => {
      this.http.get<any[]>(`http://localhost:8080/api/attendance/student/${student.id}`).subscribe(data => {
        this.attendanceList = data;
        console.log('✅ Attendance fetched:', data);
      });
    });
  }
}

}
