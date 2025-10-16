import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HealthDataService } from '../health-data.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private healthDataService = inject(HealthDataService);

  public calorieGoal = signal(2100);

  public intakeCalories = this.healthDataService.intakeCalories;
  public burnedCalories = this.healthDataService.burnedCalories;
  public breakfastItems = this.healthDataService.breakfastItems;
  public lunchItems = this.healthDataService.lunchItems;
  public dinnerItems = this.healthDataService.dinnerItems;
  public todaysActivities = this.healthDataService.activityItems;

  public remainingCalories = computed(() => this.calorieGoal() - this.intakeCalories() + this.burnedCalories());

  public get progress(): number {
    const progress = (this.intakeCalories() / this.calorieGoal()) * 100;
    return Math.min(progress, 100); // Cap progress at 100%
  }
}
