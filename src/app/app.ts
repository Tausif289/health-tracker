import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar';
import { FooterComponent } from './footer/footer.component';
import { DarkModeService } from './services/dark-mode.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('myapp');

  // 👇 Inject Dark Mode service
  constructor(public darkModeService: DarkModeService) {}
}
