import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import the AuthService
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService) {} // Inject the AuthService
}
