import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trainer-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './trainer-sidebar.component.html',
  styleUrl: './trainer-sidebar.component.css',
})
export class TrainerSidebarComponent {
  showLogoutModal = false;
  showAttendanceDropdown = false;
  showTaskDropdown = false;
  showSubmissionDropdown = false;

  constructor(private router: Router) {}

  // Open the logout confirmation modal
  openLogoutModal() {
    this.showLogoutModal = true;
  }

  // Hide the modal if user cancels
  cancelLogout() {
    this.showLogoutModal = false;
  }

  // Actually perform logout
  confirmLogout() {
    // Clear session
    sessionStorage.removeItem('user');

    // Optionally, clear other tokens or app state

    // Navigate to login (or home page)
    this.router.navigate(['/login']);

    // Hide the modal
    this.showLogoutModal = false;
  }
 toggleAttendanceDropdown() {
    this.showAttendanceDropdown = !this.showAttendanceDropdown;
  }

  toggleTaskDropdown() {
    this.showTaskDropdown = !this.showTaskDropdown;
  }

  toggleSubmissionDropdown() {
    this.showSubmissionDropdown = !this.showSubmissionDropdown;
  }
}
