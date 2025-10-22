import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Goal {
  _id?: string;
  name: string;
  type: 'Weight' | 'Calories' | 'Distance' | 'Duration';
  initialValue: number;
  currentValue: number;
  targetValue: number;
  unit: string;
  editing?: boolean;
}

export interface WeightEntry {
  _id?: string;
  date: string;
  weight: number;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GoalTrackingService {
  private apiUrl = 'http://localhost:4000/api/goals';

  constructor(private http: HttpClient) {}

  // Fetch full goal tracking data
  getGoalTracking(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Goals
  addGoal(userId: string, goal: Goal): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-goal`, { userId, goal });
  }

  updateGoal(userId: string, goalId: string, goal: Goal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/goals/${goalId}`, goal);
  }

  removeGoal(userId: string, goalId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/goals/${goalId}`);
  }

  // Weight entries
  addWeight(userId: string, entry: WeightEntry): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-weight`, { userId, entry });
  }

  updateWeight(userId: string, entryId: string, entry: WeightEntry): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/weights/${entryId}`, entry);
  }

  removeWeight(userId: string, entryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/weights/${entryId}`);
  }
}
