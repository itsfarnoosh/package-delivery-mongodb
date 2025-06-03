import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import the AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login() {
    const userData = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/33391629/api/v1/login', userData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.authService.login(response.token); // Store the token
        this.router.navigate(['/']); // Redirect to home page after successful login
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed', error);
      },
    });
  }
}
