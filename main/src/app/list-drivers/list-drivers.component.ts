import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { Driver } from '../models/driver'; // Import the Driver model
import { DatabaseService } from '../database.service'; // Import the Database service
import { UppercasePipe } from '../uppercase.pipe'; // Import the Uppercase pipe
import { Router } from '@angular/router'; // Import Router to handle redirection

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, UppercasePipe], // Import CommonModule for ngFor
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent {
  drivers: Driver[] = []; // Array to store drivers
  packagesVisibility: { [key: string]: boolean } = {}; // Track visibility of packages for each driver

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.fetchDrivers();
  }

  // Method to fetch drivers from the backend
  fetchDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data; // Store the fetched drivers
    });
  }

  // Method to delete a driver by MongoDB _id
  deleteDriver(driverId: string) {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.db.deleteDriver(driverId).subscribe(() => {
        // Refresh the list after deletion
        this.fetchDrivers();
      });
    }
  }

  // Toggle the visibility of packages for a specific driver
  togglePackages(driverId: string) {
    this.packagesVisibility[driverId] = !this.packagesVisibility[driverId];
  }

  // Check if packages are visible for a specific driver
  isPackagesVisible(driverId: string): boolean {
    return this.packagesVisibility[driverId] === true;
  }
}
