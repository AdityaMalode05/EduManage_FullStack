import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';
import { Batch } from '../models/batch';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private ht: HttpClient) {}

  getAll() {
    return this.ht.get<Trainer[]>('http://localhost:8080/api/trainers/all');
  }

  getById(id: number) {
    return this.ht.get<Trainer>(`http://localhost:8080/api/trainers/${id}`);
  }

  update(id: number, trainer: Trainer) {
    return this.ht.put(`http://localhost:8080/api/trainers/update/${id}`, trainer);
  }

  delete(id: number) {
    return this.ht.delete(`http://localhost:8080/api/trainers/delete/${id}`);
  }

  register(trainer: Trainer) {
    return this.ht.post('http://localhost:8080/api/trainers/register', trainer);
  }

getTrainerBatches(email: string) {
  return this.ht.get<Batch[]>(`http://localhost:8080/api/trainers/trainer-dashboard/batches/${email}`);
}


}
