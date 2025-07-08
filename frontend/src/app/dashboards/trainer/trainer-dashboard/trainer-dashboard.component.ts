import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [CommonModule, TrainerSidebarComponent],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.css',
})
export class TrainerDashboardComponent implements OnInit {
  showLogoutModal = false;
  trainerName: string = 'Trainer';
  batchCount = 0;
  studentCount = 0;
  taskCount = 0;
  trainerEmail = '';
  selectedQuote: string = '';

  quotes: string[] = [
    'A good teacher can inspire hope, ignite the imagination, and instill a love of learning.',
    'Education is the most powerful weapon which you can use to change the world.',
    'The influence of a good teacher can never be erased.',
    'Teaching is the one profession that creates all other professions.',
    'The art of teaching is the art of assisting discovery.',
    'To teach is to touch a life forever.',
    'Your job as a teacher is to make learning possible, not easy.',
    'A truly great teacher is hard to find, difficult to part with, and impossible to forget.',
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.trainerEmail = user?.email;

     // Pick a random quote
    this.selectedQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

    if (this.trainerEmail) {
      // Fetch trainer name from backend
      this.http
        .get<any>(
          `http://localhost:8080/api/trainers/email/${this.trainerEmail}`
        )
        .subscribe((trainer) => {
          this.trainerName = trainer.name;
        });

      // Existing batch and task data
      this.http
        .get<any[]>(
          `http://localhost:8080/api/trainers/trainer-dashboard/batches/${this.trainerEmail}`
        )
        .subscribe((batches) => {
          this.batchCount = batches.length;
          this.studentCount = batches.reduce(
            (acc, b) => acc + (b.students?.length || 0),
            0
          );
        });

      this.http
        .get<any[]>(
          `http://localhost:8080/api/tasks/trainer/${this.trainerEmail}`
        )
        .subscribe((tasks) => {
          this.taskCount = tasks.length;
        });
    }
  }

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
}
