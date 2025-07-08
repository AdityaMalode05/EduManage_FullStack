import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';

@Component({
  selector: 'app-grade-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule, TrainerSidebarComponent],
  templateUrl: './grade-submissions.component.html',
  styleUrl: './grade-submissions.component.css'
})
export class GradeSubmissionsComponent implements OnInit {
  submissions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const trainerEmail = JSON.parse(sessionStorage.getItem('user') || '{}')?.email;

    if (trainerEmail) {
      this.http.get<any>(`http://localhost:8080/api/trainers/email/${trainerEmail}`).subscribe(trainer => {
        const trainerId = trainer.id;

        this.http.get<any[]>(`http://localhost:8080/api/submissions/trainer/${trainerId}`).subscribe(data => {
          this.submissions = data.map(sub => ({
            ...sub,
            fileUrl: `http://localhost:8080/uploads/${encodeURIComponent(sub.filePath)}`,
            fileName: sub.filePath?.split('/').pop() || 'File'
          }));
        });
      });
    }
  }

  gradeSubmission(submissionId: number, grade: string) {
    const url = `http://localhost:8080/api/submissions/grade/${submissionId}?grade=${encodeURIComponent(grade)}`;

    this.http.put(url, null).subscribe({
      next: () => {
        alert('Grade submitted successfully!');
        const submission = this.submissions.find(s => s.id === submissionId);
        if (submission) submission.grade = grade;
      },
      error: (err) => {
        console.error('❌ Grade submission failed:', err);
        alert('Failed to submit grade.');
      }
    });
  }
}
