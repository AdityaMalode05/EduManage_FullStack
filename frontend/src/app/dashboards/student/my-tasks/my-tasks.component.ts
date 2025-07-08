import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StudentSidebarComponent } from '../../../components/shared/student-sidebar/student-sidebar.component';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, StudentSidebarComponent],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css',
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const email = user?.email;

    if (email) {
      this.http
        .get<any>(`http://localhost:8080/api/students/email/${email}`)
        .subscribe((student) => {
          const batchId = student?.batch?.id;
          if (batchId) {
            this.http
              .get<any[]>(`http://localhost:8080/api/tasks/batch/${batchId}`)
              .subscribe((tasks) => {
                this.tasks = tasks;
                this.tasks = tasks.map((task) => ({
                  ...task,
                  dueDate: new Date(task.dueDate),
                }));
                console.log('Fetched tasks:', tasks); // ✅ Debug this
              });
          }
        });
    }
  }
}
