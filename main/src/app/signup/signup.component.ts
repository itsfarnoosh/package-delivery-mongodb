import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is imported
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const userData = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/33391629/api/v1/signup', userData).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']); // Redirect to login page after successful signup
      },
      error: (error) => {
        this.errorMessage = 'Signup failed, please try again';
        console.error('Signup failed', error);
      },
    });
  }
}
