import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Student';

  courseId: number | null = null;
  batchId: number | null = null;

  successMessage: string = '';
  errorMessage: string = '';

  courses: any[] = [];
  batches: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchBatches();
  }

  fetchCourses() {
    this.http.get<any[]>('http://localhost:8080/api/courses/all').subscribe({
      next: (data) => (this.courses = data),
      error: () => (this.errorMessage = 'Failed to load courses'),
    });
  }

  fetchBatches() {
    this.http.get<any[]>('http://localhost:8080/api/batches/all').subscribe({
      next: (data) => (this.batches = data),
      error: () => (this.errorMessage = 'Failed to load batches'),
    });
  }

  onRegister() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      courseId: +this.courseId!, // 👈 add ! to assert non-null
      batchId: +this.batchId!, // 👈 add ! to assert non-null
    };

    console.log('Sending payload:', payload); // 👈 Optional: check console

    if (
      !this.name ||
      !this.email ||
      !this.password ||
      !this.role ||
      !this.courseId ||
      !this.batchId
    ) {
      this.errorMessage = 'Please fill all fields.';
      return;
    }

    this.http
      .post('http://localhost:8080/api/auth/register', payload, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.successMessage = res; // res is just plain string
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Registration failed.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
  }
}
