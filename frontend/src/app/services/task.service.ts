import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  assign(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/assign`, task);
  }

  // getTasks(batchId: number): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.baseUrl}/batch/${batchId}`);
  // }

  getTasksForTrainer(email: string): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.baseUrl}/trainer/${email}`);
}

}
