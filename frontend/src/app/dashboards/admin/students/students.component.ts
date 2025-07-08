import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  ulist: Student[] = [];
  s1: Student = new Student();
  showEditModal: boolean = false;
  showAddModal: boolean = false;
  searchTerm: string = '';

  // 👇 For add student form
  newStudent: any = {
    name: '',
    email: '',
    password: '',
    course: null,
    batch: null
  };
  courses: any[] = [];
  batches: any[] = [];

  constructor(private ss: StudentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.display();
    this.fetchCoursesAndBatches();
  }

  display() {
    this.ss.getAll().subscribe((data) => {
      this.ulist = data;
    });
  }

  fetchCoursesAndBatches() {
    this.http.get<any[]>('http://localhost:8080/api/courses/all').subscribe((data) => this.courses = data);
    this.http.get<any[]>('http://localhost:8080/api/batches/all').subscribe((data) => this.batches = data);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.ss.delete(id).subscribe();
      window.location.reload();
    }
  }

  edit(id: number) {
    this.ss.getById(id).subscribe((data) => {
      this.s1 = data;
      this.showEditModal = true;
    });
  }

  update() {
    if (this.s1 && this.s1.id !== undefined) {
      this.ss.update(this.s1.id, this.s1).subscribe({
        next: () => {
          this.showEditModal = false;
          this.display();
        },
        error: (err) => {
          console.error('Update failed:', err);
        },
      });
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.showAddModal = false;
  }

  addStudent() {
    const { name, email, password, course, batch } = this.newStudent;

    if (!name || !email || !password || !course || !batch) {
      alert('Please fill all fields!');
      return;
    }

    this.ss.register(this.newStudent).subscribe({
      next: () => {
        alert('Student registered successfully!');
        this.newStudent = { name: '', email: '', password: '', course: null, batch: null };
        this.showAddModal = false;
        this.display();
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Failed to register student.');
      }
    });
  }

  filteredList(): Student[] {
    const term = this.searchTerm.toLowerCase();
    return this.ulist.filter(s =>
      (s.name?.toLowerCase().includes(term) || '') ||
      (s.email?.toLowerCase().includes(term) || '') ||
      (s.batch?.name?.toLowerCase().includes(term) || '') ||
      (s.course?.name?.toLowerCase().includes(term) || '')
    );
  }
}
