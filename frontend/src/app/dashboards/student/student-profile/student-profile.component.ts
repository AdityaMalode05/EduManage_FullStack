import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentSidebarComponent } from '../../../components/shared/student-sidebar/student-sidebar.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentSidebarComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  student: any = {};
  showModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user?.email) {
      this.http.get<any>(`http://localhost:8080/api/students/email/${user.email}`).subscribe((data) => {
        this.student = data;
      });
    }
  }

  saveProfile() {
    this.http.put<any>(`http://localhost:8080/api/students/update/${this.student.id}`, this.student).subscribe(() => {
      alert('Profile updated successfully!');
      this.showModal = false;
    });
  }

  
}
