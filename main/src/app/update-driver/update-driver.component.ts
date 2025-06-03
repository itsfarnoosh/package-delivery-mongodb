import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DatabaseService } from '../database.service'; // Import your Database service
import { Router } from '@angular/router'; // Import Router to handle redirection

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here for *ngIf and FormsModule for ngModel
})
export class UpdateDriverComponent {
  driverId: string = ''; // Variable to store MongoDB driver ID
  driverLicence: string = ''; // Variable to store updated license
  driverDepartment: string = ''; // Variable to store updated department
  errorMessage: string = ''; // Variable to handle error messages

  constructor(private db: DatabaseService, private router: Router) {}

  // Method to update the driver
  updateDriver() {
    if (!this.driverId || !this.driverLicence || !this.driverDepartment) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    // Send update request to the backend
    this.db.updateDriver(this.driverId, {
      driver_licence: this.driverLicence,
      driver_department: this.driverDepartment
    }).subscribe({
      next: () => {
        // Redirect to the list of drivers upon successful update
        this.router.navigate(['/list-drivers']);
      },
      error: (err) => {
        this.errorMessage = 'Error updating driver. Please check the details and try again.';
      }
    });
  }
}
