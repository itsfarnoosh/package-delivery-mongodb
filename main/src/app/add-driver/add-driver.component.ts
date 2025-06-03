import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Router } from '@angular/router';
import { Driver } from '../models/driver'; // Import the Driver model class
import { DatabaseService } from '../database.service'; // Import your Database service

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule], // Ensure FormsModule is imported for ngModel
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent {
  driver: Driver = new Driver(); // Initialize the Driver model

  constructor(private db: DatabaseService, private router: Router) {}

  addDriver() {
    console.log('Add Driver button clicked');

    // Ensure all necessary fields are filled
    if (!this.driver.driver_name || !this.driver.driver_licence || !this.driver.driver_department) {
      console.error('Please fill in all required fields.');
      this.router.navigate(['/invalid-data']); // Navigate to invalid data page
      return;
    }

    // Make API call to add the driver
    this.db.createDriver(this.driver).subscribe({
      next: (data: any) => {
        console.log('Driver added successfully:', data);
        this.router.navigate(['list-drivers']); // Redirect to the list-drivers page
      },
      error: (error) => {
        console.error('Error adding driver:', error);
        this.router.navigate(['/invalid-data']); // Navigate to invalid data page
      },
      complete: () => {
        console.log('Driver addition completed.');
      }
    });
  }
}
