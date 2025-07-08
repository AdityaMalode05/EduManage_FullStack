import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showLogoutModal = false;

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
}
