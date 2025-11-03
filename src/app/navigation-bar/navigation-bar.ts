import {  ChangeDetectorRef,ChangeDetectionStrategy, Component,  effect,signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Add this import
import { DarkModeService } from '../services/dark-mode.services';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.html',
  styleUrls: ['./navigation-bar.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule] // ✅ Add CommonModule here
})
export class NavigationBarComponent {
  isMenuOpen = signal(false);

  constructor(
    public darkModeService: DarkModeService
  ) {
     effect(() => {
      console.log('Login status changed:', this.darkModeService.isLogin());
    });
  }

  

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleTheme() {
    this.darkModeService.toggle();
  }
}
