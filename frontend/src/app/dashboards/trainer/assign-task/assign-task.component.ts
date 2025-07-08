import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../services/trainer.service';
import { HttpClient } from '@angular/common/http';
import { Batch } from '../../../models/batch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [CommonModule, FormsModule, TrainerSidebarComponent],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.css',
})
export class AssignTaskComponent implements OnInit {
  batches: Batch[] = [];

  task: Task = {
    title: '',
    description: '',
    dueDate: '',
    batch: {
      id: 0
    }
  };

  constructor(
    private trainerService: TrainerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('trainerEmail');
    if (email) {
      this.trainerService.getTrainerBatches(email).subscribe((data) => {
        this.batches = data;
      });
    }
  }

  assign() {
    const email = JSON.parse(sessionStorage.getItem('user') || '{}')?.email;

    if (!email) return;

    this.http
      .post<Task>(
        `http://localhost:8080/api/tasks/assign?trainerEmail=${email}`,
        this.task
      )
      .subscribe({
        next: (res) => {
          alert('Task assigned successfully!');
          this.task.title = '';
          this.task.description = '';
          this.task.dueDate = '';
          this.task.batch.id = 0;
        },
        error: (err) => {
          console.error('Assignment failed:', err);
        },
      });
      this.task = new Task();
  }
}
