// src/app/services/exam-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class ExamDataService {
  private examDataSubject = new BehaviorSubject<any[]>([]);  // Initial value is an empty array
  examData$ = this.examDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchExamData() {
    this.http.get<any[]>('assets/examdata.json').subscribe((data) => {
      this.examDataSubject.next(data);  // Update the value of the BehaviorSubject
    });
  }
}

