import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor and other directives
import { FormsModule } from '@angular/forms'; // For ngModel
import { Driver } from '../models/driver'; // Driver model
import { DatabaseService } from '../database.service'; // For fetching drivers
import { io } from 'socket.io-client'; // Import Socket.io

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css'],
})
export class TextToSpeechComponent {
  drivers: Driver[] = []; // List of drivers
  textToConvert: string = ''; // Text to convert
  audioUrl: string | null = null; // Store the MP3 URL
  private socket: any; // Socket.io instance

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.fetchDrivers();

    // Initialize Socket.io connection
    this.socket = io('http://localhost:8080'); // Connect to backend

    // Listen for the audio file from the server
    this.socket.on('audioFile', (data: any) => {
      // Create an object URL from the binary audio data
      const blob = new Blob([data], { type: 'audio/mp3' });
      this.audioUrl = URL.createObjectURL(blob); // Create an Object URL for the audio
    });
  }

  // Fetch the list of drivers
  fetchDrivers(): void {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  // Copy license to text area and send to server for text-to-speech conversion
  copyAndConvert(license: string): void {
    this.textToConvert = license; // Copy the driver license to the text box
    this.socket.emit('textToSpeech', this.textToConvert); // Emit the license to the backend for conversion
  }
}
