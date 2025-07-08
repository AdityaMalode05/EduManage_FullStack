import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  c1: Course = { name: '' };
  showModal = false;
  isEditing = false;

  constructor(private cs: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.cs.getAll().subscribe((data) => this.courses = data);
  }

  openModal() {
    this.c1 = { name: '' }; // New course object
    this.isEditing = false;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  edit(id: number) {
    this.cs.getById(id).subscribe((data) => {
      this.c1 = data || { name: '' };
      this.isEditing = true;
      this.showModal = true;
    });
  }

  saveCourse() {
    if (this.isEditing && this.c1.id !== undefined) {
      this.cs.update(this.c1.id, this.c1).subscribe(() => {
        this.loadCourses();
        this.closeModal();
      });
    } else {
      this.cs.create(this.c1).subscribe(() => {
        this.loadCourses();
        this.closeModal();
      });
    }
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this Course?')) {
      this.cs.delete(id).subscribe();
      window.location.reload();
    }
  }
}
