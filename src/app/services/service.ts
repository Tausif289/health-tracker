import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = signal<any>(null); // global user data signal

  setUser(userData: any) {
    this.user.set(userData);
    localStorage.setItem('user', JSON.stringify(userData)); /// persist data
  }

  getUser() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
    return this.user();
  }

  clearUser() {
    this.user.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
