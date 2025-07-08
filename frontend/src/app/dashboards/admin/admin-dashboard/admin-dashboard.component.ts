import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';
import { UserPieChartComponent } from '../user-pie-chart/user-pie-chart.component';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    SummaryCardsComponent,
    UserPieChartComponent,
    RecentActivityComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {}
