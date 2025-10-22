import { ChangeDetectionStrategy, Component, Renderer2, Inject, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar';
import { FooterComponent } from './footer/footer.component';
import { DarkModeService } from './services/dark-mode.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavigationBarComponent, FooterComponent],
  template: `
    <app-navigation-bar></app-navigation-bar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
   constructor(public darkModeService: DarkModeService) {}
}
