import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';

@Component({
  selector: 'app-trainer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TrainerSidebarComponent],
  templateUrl: './trainer-profile.component.html',
  styleUrl: './trainer-profile.component.css'
})
export class TrainerProfileComponent implements OnInit {
  trainer: any = {};
  showModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const email = user?.email;

    if (email) {
      this.http.get<any>(`http://localhost:8080/api/trainers/Email/${email}`).subscribe(data => {
        this.trainer = data;
      });
    }
  }

  saveProfile() {
    this.http.put<any>(`http://localhost:8080/api/trainers/update/${this.trainer.id}`, this.trainer).subscribe(() => {
      alert('Profile updated successfully!');
      this.showModal = false;
    });
  }
}
