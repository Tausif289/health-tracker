import { Routes } from '@angular//router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'add-food',
    loadComponent: () => import('./food-search/food-search').then(m => m.FoodSearchComponent),
  },
  {
    path: 'add-activity',
    loadComponent: () => import('./add-activity/add-activity').then(m => m.AddActivityComponent),
  },
  {
    path: 'goal-tracking',
    loadComponent: () => import('./goal-tracking/goal-tracking').then(m => m.GoalTrackingComponent),
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.component').then(m => m.ReportComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(m => m.ProfileComponent2),
  },
];
