// dark-mode.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public isDarkMode = signal(true);
  public isLogin = signal(false); 
  public user = signal<any>(null);

   constructor() {
    // 🔹 Load dark mode preference
    const savedDark = localStorage.getItem('darkMode');
    if (savedDark) {
      this.isDarkMode.set(savedDark === 'true');
    }

    // 🔹 Check login status from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      this.isLogin.set(true);
      this.user.set(JSON.parse(userData));
    } else {
      this.isLogin.set(false);
      this.user.set(null);
    }
  }
  toggle() {
    this.isDarkMode.set(!this.isDarkMode());
    console.log(this.isDarkMode())
    localStorage.setItem('darkMode', String(this.isDarkMode()));
  }
    // 🔹 Save login details
  login(userData: any, token: string) {
    this.isLogin.set(true);
    this.user.set(userData);
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    window.location.href = '/dashboard';
  }

  // 🔹 Logout user
  logout() {
    this.isLogin.set(false);
    this.user.set(null);
    localStorage.removeItem('isLogin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
