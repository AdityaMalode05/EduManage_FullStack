import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/update/${id}`, student);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  register(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/register`, student);
  }
}
