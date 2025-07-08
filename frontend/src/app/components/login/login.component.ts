import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'Student';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const payload = {
      role: this.role.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.http
      .post('http://localhost:8080/api/auth/login', payload, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          // ✅ Clear old data
          sessionStorage.removeItem('user');
          localStorage.removeItem('trainerEmail');

          // ✅ Store session and trainer email if role is Trainer
          const userObject = {
            email: this.email,
            role: this.role,
          };
          sessionStorage.setItem('user', JSON.stringify(userObject));

          if (this.role === 'Trainer') {
            localStorage.setItem('trainerEmail', this.email); // ✅ Important
          }

          // ✅ Navigate
          this.successMessage = res;
          setTimeout(() => {
            this.successMessage = '';
            if (this.role === 'Admin') {
              this.router.navigate(['/Admin-Dashboard']);
            } else if (this.role === 'Trainer') {
              this.router.navigate(['/Trainer-Dashboard']);
            } else if (this.role === 'Student') {
              this.router.navigate(['/Student-Dashboard']);
            }
          }, 1000);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Invalid credentials!';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
  }
}
