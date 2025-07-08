import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Course[]>('http://localhost:8080/api/courses/all');
  }

  getById(id: number) {
    return this.http.get<Course>(`http://localhost:8080/api/courses/${id}`);
  }

  create(course: Course) {
    return this.http.post('http://localhost:8080/api/courses/register', course);
  }

  update(id: number, course: Course) {
    return this.http.put(`http://localhost:8080/api/courses/update/${id}`, course);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/api/courses/delete/${id}`);
  }
}
