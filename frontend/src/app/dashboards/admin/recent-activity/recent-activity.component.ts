import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
   imports: [CommonModule],
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {
  activities: { message: string; role: string }[] = [];

  constructor(private dashboardService: DashboardService) {}



  ngOnInit(): void {
  this.dashboardService.getRecentActivity().subscribe(data => {
    console.log('Recent Activities:', data); // <--- log to see the data
    this.activities = data;
  });
}

}
