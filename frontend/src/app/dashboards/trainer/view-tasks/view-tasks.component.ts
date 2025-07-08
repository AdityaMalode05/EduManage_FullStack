import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task';
// import { TaskService } from '../../../services/task.service';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [CommonModule, TrainerSidebarComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css',
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const email = user?.email;

  if (email) {
    this.http.get<Task[]>(`http://localhost:8080/api/tasks/trainer/${email}`).subscribe((data) => {
      this.tasks = data;
    });
  }
}
}
