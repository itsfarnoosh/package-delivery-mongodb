import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './models/driver';
import { Package } from './models/package'; // Import Package model if you have it defined

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:8080/33391629/api/v1'; // Backend URL

  constructor(private http: HttpClient) {}

  // Driver Methods
  createDriver(driver: Driver): Observable<any> {
    return this.http.post(`${this.apiUrl}/drivers/add`, driver, httpOptions);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/drivers`);
  }

  deleteDriver(_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/drivers/delete/${_id}`, httpOptions);
  }

  // Update Driver Method
  updateDriver(_id: string, driverData: { driver_licence: string, driver_department: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/drivers/update/${_id}`, driverData, httpOptions);
  }

 // Method to create a package
 createPackage(packageData: Package): Observable<any> {
  return this.http.post(`${this.apiUrl}/packages/add`, packageData);
}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/packages`);
  }
  // Fetch packages assigned to a driver by driver ID
  getPackagesByDriver(driverId: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/drivers/${driverId}/packages`);
  }

  deletePackage(packageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/packages/delete/${packageId}`, httpOptions);
  }

  updatePackage(packageId: string, packageData: Partial<Package>): Observable<any> {
    return this.http.put(`${this.apiUrl}/packages/update/${packageId}`, packageData);
  }
  getDriverById(driverId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/drivers/${driverId}`);
  }


  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics`); // Fetch statistics
  }
  // Authentication Methods

  // Signup
  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password }, httpOptions);
  }

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, httpOptions);
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, httpOptions);
  }

}
