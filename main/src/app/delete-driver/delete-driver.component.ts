import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DatabaseService } from '../database.service'; // Import your Database service
import { Router } from '@angular/router'; // Router to handle redirection

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css'],
  imports: [FormsModule, CommonModule], // Add CommonModule and FormsModule here
})
export class DeleteDriverComponent {
  driverId: string = ''; // Variable to hold the input MongoDB _id
  errorMessage: string = ''; // Variable to store error messages

  constructor(private db: DatabaseService, private router: Router) {}

  // Method to delete driver
  deleteDriver() {
    if (this.driverId.trim() === '') {
      this.errorMessage = 'Please enter a valid MongoDB ID';
      return;
    }

    this.db.deleteDriver(this.driverId).subscribe({
      next: () => {
        // After successful deletion, redirect to the list of drivers
        this.router.navigate(['/list-drivers']);
      },
      error: (err) => {
        // Handle error case
        this.errorMessage = 'Error deleting driver. Please check the ID and try again.';
      }
    });
  }
}
