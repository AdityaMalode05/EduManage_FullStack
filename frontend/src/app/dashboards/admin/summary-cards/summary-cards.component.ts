import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary-cards',
  imports : [ ],
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent implements OnInit {
  studentCount = 0;
  trainerCount = 0;
  courseCount = 0;
  batchCount = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getSummaryCounts().subscribe(data => {
      this.studentCount = data.students;
      this.trainerCount = data.trainers;
      this.courseCount = data.courses;
      this.batchCount = data.batches;
    });
  }
}
