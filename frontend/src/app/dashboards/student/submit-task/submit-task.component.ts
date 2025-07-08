import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentSidebarComponent } from '../../../components/shared/student-sidebar/student-sidebar.component';

@Component({
  selector: 'app-submit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentSidebarComponent],
  templateUrl: './submit-task.component.html',
  styleUrl: './submit-task.component.css'
})
export class SubmitTaskComponent implements OnInit {
  tasks: any[] = [];
  selectedTaskId: number = 0;
  title: string = '';
  description: string = '';
  file: File | null = null;
  student: any = null; // ✅ Store full student

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const email = JSON.parse(sessionStorage.getItem('user') || '{}')?.email;

    if (email) {
      this.http.get<any>(`http://localhost:8080/api/students/email/${email}`).subscribe(student => {
        this.student = student;  // ✅
        const batchId = student?.batch?.id;
        if (batchId) {
          this.http.get<any[]>(`http://localhost:8080/api/tasks/batch/${batchId}`).subscribe(tasks => {
            this.tasks = tasks;
          });
        }
      });
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submitTask() {
    if (!this.student?.id) {
      alert("Student not loaded yet.");
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('submittedDate', new Date().toISOString().split('T')[0]); // yyyy-MM-dd
    formData.append('studentId', this.student.id.toString()); // ✅ FIXED
    formData.append('taskId', this.selectedTaskId.toString());

    if (this.file) {
      formData.append('file', this.file);
    } else {
      alert('Please select a file.');
      return;
    }

    console.log('📦 Submitting:', {
      title: this.title,
      description: this.description,
      studentId: this.student.id,
      taskId: this.selectedTaskId,
      file: this.file.name,
    });

    this.http.post(`http://localhost:8080/api/submissions/upload`, formData).subscribe({
      next: () => {
        alert('Task submitted successfully!');
        this.title = '';
        this.description = '';
        this.selectedTaskId = 0;
      },
      error: (err) => {
        console.error('❌ Submission error:', err);
        alert('Submission failed. Please try again.');
      }
    });
  }
}
