import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Check if localStorage is available and the user is logged in
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token'); // Assuming token is saved in localStorage
    }
    return false; // Return false if localStorage is unavailable
  }

  // Set the login token in localStorage
  login(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token); // Save token in localStorage
    }
  }

  // Remove the login token from localStorage
  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }
}
