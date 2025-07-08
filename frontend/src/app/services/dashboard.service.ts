import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getSummaryCounts() {
    return this.http.get<any>('http://localhost:8080/api/dashboard/summary');
  }

  getPieChartData() {
    return this.http.get<any>('http://localhost:8080/api/dashboard/piechart');
  }

  getRecentActivities() {
    return this.http.get<any>('http://localhost:8080/api/dashboard/activities');
  }

  getRoleCounts() {
    return this.http.get<any>(
      'http://localhost:8080/api/dashboard/role-counts'
    );
  }

 getRecentActivity() {
  return this.http.get<any[]>(
    'http://localhost:8080/api/dashboard/recent-activity'
  );
}
}
