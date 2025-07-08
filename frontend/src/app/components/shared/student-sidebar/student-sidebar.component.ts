import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css',
})
export class StudentSidebarComponent {
  showLogoutModal = false;

  constructor(private router: Router) {}

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.showLogoutModal = false;
  }
}
