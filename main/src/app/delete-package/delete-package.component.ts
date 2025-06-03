import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DatabaseService } from '../database.service'; // Import your Database service
import { Router } from '@angular/router'; // Router to handle redirection

@Component({
  selector: 'app-delete-package',
  standalone: true,
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css'],
  imports: [FormsModule, CommonModule], // Add CommonModule and FormsModule here
})
export class DeletePackageComponent {
  packageId: string = ''; // Variable to hold the input MongoDB _id
  errorMessage: string = ''; // Variable to store error messages

  constructor(private db: DatabaseService, private router: Router) {}

  // Method to delete package
  deletePackage() {
    if (this.packageId.trim() === '') {
      this.errorMessage = 'Please enter a valid MongoDB ID';
      return;
    }

    this.db.deletePackage(this.packageId).subscribe({
      next: () => {
        // After successful deletion, redirect to the list of packages
        this.router.navigate(['/list-packages']);
      },
      error: (err) => {
        // Handle error case
        this.errorMessage = 'Error deleting package. Please check the ID and try again.';
      }
    });
  }
}
