import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Package } from '../models/package'; // Import the Package model
import { DatabaseService } from '../database.service'; // Import the Database service
import { io } from 'socket.io-client'; // Import native socket.io client

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.css'],
})
export class GenerativeAiComponent implements OnInit {
  packages: Package[] = []; // Array to store packages
  distance: { [key: string]: number } = {}; // Object to store distances for each package
  selectedDistance: number | null = null;
  selectedMiles: number | null = null;
  private socket: any; // Declare the socket

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    // Initialize the socket connection
    this.socket = io('http://localhost:8080'); // Ensure this matches your backend server address

    // Fetch the packages
    this.fetchPackages();
  }

  // Fetch packages from the database
  fetchPackages() {
    this.db.getPackages().subscribe((data: Package[]) => {
      this.packages = data;
    });
  }

  // Send the destination to the backend using Socket.io
  calculateDistance(destination: string, packageId: string) {
    this.socket.emit('calculateDistance', { destination, packageId });

    // Listen for the response from the backend
    this.socket.on('distanceCalculated', (data: any) => {
      this.distance[packageId] = data.distance; // Store the calculated distance
      this.selectedDistance = data.distance;
     
    });

    // Handle error response
    this.socket.on('error', (error: string) => {
      console.error('Error calculating distance:', error);
    });
  }

  ngOnDestroy(): void {
    // Clean up socket connection on component destroy
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
