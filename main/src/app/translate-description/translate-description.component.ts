import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package'; // Your Package model
import { DatabaseService } from '../database.service'; // For fetching packages
import { io } from 'socket.io-client';

@Component({
  selector: 'app-translate-description',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css'],
})
export class TranslateDescriptionComponent implements OnInit {
  packages: Package[] = []; // List of packages
  selectedLanguage: string = ''; // Selected language code
  translationHistory: { text: string; targetLanguage: string; translation: string }[] = []; // Store translations
  private socket: any; // Socket.io instance

  languages = [
    { code: 'zh', name: 'Chinese' },
    { code: 'fa', name: 'Persian' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
  ]; // List of available languages

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.fetchPackages();

    // Initialize Socket.io connection
    this.socket = io('http://localhost:8080');

    // Listen for translated descriptions from the server
    this.socket.on('translationResponse', (data: any) => {
      // Store translation in history
      this.translationHistory.push({
        text: data.originalText, // Original description text
        targetLanguage: this.getLanguageName(data.targetLanguage), // Convert code to language name
        translation: data.translatedDescription, // Translated text
      });
    });
  }

  // Fetch the list of packages
  fetchPackages(): void {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  // Get the full language name from the language code
  getLanguageName(languageCode: string): string {
    const language = this.languages.find(lang => lang.code === languageCode);
    return language ? language.name : 'Unknown'; // Default to 'Unknown' if the language code is not found
  }

  // Request translation for a specific package
  translateDescription(description: string): void {
    if (!this.selectedLanguage) {
      alert('Please select a language');
      return;
    }

    // Emit the translation request to the backend
    this.socket.emit('translateDescription', {
      description: description,
      targetLanguage: this.selectedLanguage, // Send the language code
    });
  }
}
