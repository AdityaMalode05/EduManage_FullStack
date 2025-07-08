import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user session exists
    const user = sessionStorage.getItem('user');
    if (user) {
      return true;
    } else {
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
