import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  statistics: any = {};
  private apiUrl = 'http://localhost:8080/33391629/api/v1/statistics'; // Backend API for fetching statistics
  private resetUrl = 'http://localhost:8080/33391629/api/v1/statistics/reset'; // API for resetting statistics

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  // Fetch the statistics from the backend
  fetchStatistics(): void {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.statistics = data;
    });
  }

  // Reset the statistics by calling the reset endpoint
  resetStatistics(): void {
    this.http.post(this.resetUrl, {}).subscribe({
      next: () => {
        this.fetchStatistics(); // Refresh statistics after reset
        alert('Statistics reset successfully');
      },
      error: () => {
        alert('Error resetting statistics');
      }
    });
  }
}
