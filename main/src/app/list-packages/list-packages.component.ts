import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { Package } from '../models/package'; // Import the Package model
import { DatabaseService } from '../database.service'; // Import the Database service
import { KgToGramsPipe } from '../pipes/kg-to-grams.pipe'; // Import the standalone pipe
import { Router } from '@angular/router'; // Import Router to handle redirection

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [CommonModule, KgToGramsPipe], // Import the standalone pipe
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})
export class ListPackagesComponent implements OnInit {
  packages: Package[] = []; // Array to store packages
  showDriverDetails: { [key: string]: boolean } = {}; // To toggle showing driver details
  driverDetails: { [key: string]: any } = {}; // To store driver details for each package

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.fetchPackages();
  }

  // Method to fetch packages from the backend
  fetchPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data; // Store the fetched packages
    });
  }

  // Method to delete a package by MongoDB _id
  deletePackage(packageId: string) {
    if (confirm('Are you sure you want to delete this package?')) {
      this.db.deletePackage(packageId).subscribe(() => {
        // Refresh the list after deletion
        this.fetchPackages();
      });
    }
  }


}
