import { Injectable } from '@angular/core';
import { Batch } from '../models/batch';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Batch[]>('http://localhost:8080/api/batches/all');
  }

  getById(id: number) {
    return this.http.get<Batch>(`http://localhost:8080/api/batches/${id}`);
  }

  create(batch: Batch) {
    return this.http.post('http://localhost:8080/api/batches/add', batch);
  }

  update(id: number, batch: Batch) {
    return this.http.put(
      `http://localhost:8080/api/batches/update/${id}`,
      batch
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/api/batches/delete/${id}`);
  }
}
