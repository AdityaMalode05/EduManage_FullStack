import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../services/trainer.service';
import { Batch } from '../../../models/batch';
import { CommonModule } from '@angular/common';
import { TrainerSidebarComponent } from '../../../components/shared/trainer-sidebar/trainer-sidebar.component';

@Component({
  selector: 'app-my-batches',
  standalone: true,
  imports: [CommonModule, TrainerSidebarComponent],
  templateUrl: './my-batches.component.html',
  styleUrl: './my-batches.component.css',
})
export class MyBatchesComponent implements OnInit {
  batches: Batch[] = [];
  trainerEmail: string = '';

  constructor(private ts: TrainerService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('trainerEmail'); // Or from login service
    if (email) {
      this.trainerEmail = email;
      this.ts.getTrainerBatches(email).subscribe((data) => {
       
        this.batches = data;
      });
    }
  }
}
