import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngIf
import { FormsModule } from '@angular/forms'; // For ngModel
import { DatabaseService } from '../database.service'; // Your service to handle API requests
import { Router } from '@angular/router'; // For navigation

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule for ngModel and CommonModule for *ngIf
})
export class UpdatePackageComponent {
  packageId: string = ''; // Variable to store package MongoDB ID
  packageDestination: string = ''; // Variable to store new package destination
  errorMessage: string = ''; // Variable to handle error messages

  constructor(private db: DatabaseService, private router: Router) {}

  // Method to handle the update request
  updatePackage() {
    if (!this.packageId || !this.packageDestination) {
      this.errorMessage = 'Both Package ID and new destination are required!';
      return;
    }

    // Send update request to the backend
    this.db.updatePackage(this.packageId, { package_destination: this.packageDestination })
      .subscribe({
        next: () => {
          // Redirect to the list of packages on successful update
          this.router.navigate(['/list-packages']);
        },
        error: (err) => {
          // Handle any error that occurred during the update process
          this.errorMessage = 'Error updating package. Please check the details and try again.';
        }
      });
  }
}
