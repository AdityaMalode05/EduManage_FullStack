import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-user-pie-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './user-pie-chart.component.html',
  styleUrls: ['./user-pie-chart.component.css']
})
export class UserPieChartComponent implements OnInit {
  pieChartType: ChartType = 'pie';

pieChartData: ChartData<'pie', number[], string> = {
  labels: ['Admins', 'Trainers', 'Students'],
  datasets: [
    {
      data: [5, 10, 20], // dummy counts
      backgroundColor: ['#007bff', '#ffc107', '#28a745']
    }
  ]
};


pieChartOptions: ChartOptions = {
  responsive: true,
  // animation: {
  //   animateRotate: true,
  //   animateScale: true
  // },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#000'
      }
    }
  }
};


  constructor(private dashboardService: DashboardService) {}

ngOnInit() {
  this.dashboardService.getRoleCounts().subscribe((data) => {
    this.pieChartData = {
      labels: ['Admins', 'Trainers', 'Students'],
      datasets: [
        {
          data: [data.admins, data.trainers, data.students],
          backgroundColor: ['#007bff', '#ffc107', '#28a745'],
        },
      ],
    };
  });
}

}
