import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';

@Component({
  selector: 'app-view-submissions',
  standalone: true,
  imports: [CommonModule, TrainerSidebarComponent],
  templateUrl: './view-submissions.component.html',
  styleUrl: './view-submissions.component.css',
})
export class ViewSubmissionsComponent implements OnInit {
  submissions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  const trainerEmail = JSON.parse(sessionStorage.getItem('user') || '{}')?.email;

  if (trainerEmail) {
    this.http.get<any>(`http://localhost:8080/api/trainers/email/${trainerEmail}`).subscribe(trainer => {
      const trainerId = trainer.id;

      this.http.get<any[]>(`http://localhost:8080/api/submissions/trainer/${trainerId}`).subscribe((data) => {
        const today = new Date();
        this.submissions = data.map((sub) => {
          const dueDate = new Date(sub.task?.dueDate);
          const submissionDate = new Date(sub.submissionDate);
          const isLate = submissionDate > dueDate;

          return {
            ...sub,
            isLate,
            status: sub.grade ? 'Graded' : isLate ? 'Late' : 'On Time',
            fileUrl: `http://localhost:8080/uploads/${encodeURIComponent(sub.filePath)}`
          };
        });
      });
    });
  }
}

}
