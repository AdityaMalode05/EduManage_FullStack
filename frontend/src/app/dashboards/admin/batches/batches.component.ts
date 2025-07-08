import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Batch } from '../../../models/batch';
import { BatchService } from '../../../services/batch.service';

@Component({
  selector: 'app-batches',
  imports: [SidebarComponent, CommonModule,FormsModule],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css'
})
export class BatchesComponent {

  batches: Batch[] = [];
    b1: Batch = { name: '' };
    showModal = false;
    isEditing = false;
  
    constructor(private bs: BatchService) {}
  
    ngOnInit(): void {
      this.loadCourses();
    }
  
    loadCourses() {
      this.bs.getAll().subscribe((data) => this.batches = data);
    }
  
    openModal() {
      this.b1 = { name: '' }; 
      this.isEditing = false;
      this.showModal = true;
    }
  
    closeModal() {
      this.showModal = false;
    }
  
    edit(id: number) {
      this.bs.getById(id).subscribe((data) => {
        this.b1 = data || { name: '' };
        this.isEditing = true;
        this.showModal = true;
      });
    }
  
    saveCourse() {
      if (this.isEditing && this.b1.id !== undefined) {
        this.bs.update(this.b1.id, this.b1).subscribe(() => {
          this.loadCourses();
          this.closeModal();
        });
      } else {
        this.bs.create(this.b1).subscribe(() => {
          this.loadCourses();
          this.closeModal();
        });
      }
    }
  
    delete(id: number) {
      if (confirm('Are you sure you want to delete this Course?')) {
        this.bs.delete(id).subscribe();
        window.location.reload();
      }
    }

}
