import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-logout',
  template: '',
  styleUrls: []
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.logout();
  }

  logout() {
    this.authService.logout(); // Clear the token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
