
import { ChangeDetectionStrategy, Component, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  public isDarkMode = signal(true);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.applyTheme();
  }

  public toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    this.applyTheme();
  }

  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-mode', this.isDarkMode());
      document.body.classList.toggle('light-mode', !this.isDarkMode());
    }
  }
}
