import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.html',
  styleUrls: ['./navigation-bar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule]
})
export class NavigationBarComponent {
  isMenuOpen = signal(false);
  isDarkMode = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
