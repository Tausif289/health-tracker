
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  public isMenuOpen = signal(false);
  public isDarkMode = signal(false);

  public toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  public toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
