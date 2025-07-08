import { Component } from '@angular/core';
import { Trainer } from '../../../models/trainer';
import { TrainerService } from '../../../services/trainer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent {
  ulist: Trainer[] = [];
  t1: Trainer = new Trainer();
  showEditModal = false;
  showAddModal = false;
  searchTerm: string = '';

  newTrainer: any = {
    name: '',
    email: '',
    password: '',
    course: null,
    batch: null,
  };
  courses: any[] = [];
  batches: any[] = [];

  constructor(private ts: TrainerService, private http: HttpClient) {}

  ngOnInit(): void {
    this.display();
    this.fetchCoursesAndBatches();
  }

  display() {
    this.ts.getAll().subscribe((data) => {
      this.ulist = data;
    });
  }

  fetchCoursesAndBatches() {
    this.http.get<any[]>('http://localhost:8080/api/courses/all').subscribe((data) => this.courses = data);
    this.http.get<any[]>('http://localhost:8080/api/batches/all').subscribe((data) => this.batches = data);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this trainer?')) {
      this.ts.delete(id).subscribe();
      window.location.reload();
    }
  }

  edit(id: number) {
    this.ts.getById(id).subscribe((data) => {
      this.t1 = data;
      this.showEditModal = true;
    });
  }

  update() {
    if (this.t1 && this.t1.id !== undefined) {
      this.ts.update(this.t1.id, this.t1).subscribe(() => {
        this.showEditModal = false;
        this.display();
      });
    }
  }

  addTrainer() {
    const { name, email, password, course, batch } = this.newTrainer;
    if (!name || !email || !password || !course || !batch) {
      alert('Please fill all fields!');
      return;
    }

    this.ts.register(this.newTrainer).subscribe({
      next: () => {
        alert('Trainer registered successfully!');
        this.newTrainer = { name: '', email: '', password: '', course: null, batch: null };
        this.showAddModal = false;
        this.display();
      },
      error: (err) => {
        console.error('Failed to register:', err);
        alert('Registration failed.');
      }
    });
  }

  closeModal() {
    this.showEditModal = false;
    this.showAddModal = false;
  }

  filteredList(): Trainer[] {
    const term = this.searchTerm.toLowerCase();
    return this.ulist.filter(t =>
      (t.name?.toLowerCase().includes(term) || '') ||
      (t.email?.toLowerCase().includes(term) || '') ||
      (t.batch?.name?.toLowerCase().includes(term) || '') ||
      (t.course?.name?.toLowerCase().includes(term) || '')
    );
  }
}
