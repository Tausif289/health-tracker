// dark-mode.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public isDarkMode = signal(false);

  constructor() {
    // Load saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      this.isDarkMode.set(saved === 'true');
    }
  }

  toggle() {
    this.isDarkMode.set(!this.isDarkMode());
    console.log(this.isDarkMode())
    localStorage.setItem('darkMode', String(this.isDarkMode()));
  }
}
