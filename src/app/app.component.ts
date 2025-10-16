import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavigationBarComponent],
  template: `
    <app-navigation-bar></app-navigation-bar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
