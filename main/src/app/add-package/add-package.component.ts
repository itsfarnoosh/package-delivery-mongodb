import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For using ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { DatabaseService } from '../database.service'; // Your service to handle API requests
import { Router } from '@angular/router'; // For navigation
import { Package } from '../models/package'; // Your Package model

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Import FormsModule for ngModel and CommonModule for *ngIf
})
export class AddPackageComponent implements OnInit {
  package: Package = new Package(); // Initialize the Package model
  drivers: any[] = []; // Array to store drivers
  errorMessage: string = ''; // Variable to handle error messages

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of drivers to assign packages to
    this.db.getDrivers().subscribe({
      next: (data: any) => {
        this.drivers = data; // Populate drivers array
      },
      error: (error) => {
        console.error('Error fetching drivers:', error);
        this.errorMessage = 'Error fetching drivers. Please try again later.';
      }
    });
  }

  addPackage() {
    // Ensure that all necessary fields are filled
    if (!this.package.package_title || !this.package.package_weight || !this.package.package_destination || !this.package.driver_id) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Call the backend service to add the package
    this.db.createPackage(this.package).subscribe({
      next: (response) => {
        console.log('Package added successfully:', response);
        this.router.navigate(['/list-packages']); // Redirect to the list of packages
      },
      error: (error) => {
        console.error('Error adding package:', error);
        this.errorMessage = 'Error adding package. Please try again.';
      }
    });
  }
}
