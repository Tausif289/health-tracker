import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { FoodSearchComponent } from './food-search/food-search';
import { AddActivityComponent } from './add-activity/add-activity';
import { GoalTrackingComponent } from './goal-tracking/goal-tracking';
import { ReportComponent } from './report/report';
import { ProfileComponent } from './profile/profile';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'add-food', component: FoodSearchComponent },
  { path: 'add-activity', component: AddActivityComponent },
  { path: 'goal-tracking', component: GoalTrackingComponent },
  { path: 'report', component: ReportComponent },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
