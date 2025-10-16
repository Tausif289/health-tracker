
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WeeklyWeightEntry {
  week: number;
  weight: number;
}

@Component({
  selector: 'app-goal-tracking',
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-tracking.html',
  styleUrls: ['./goal-tracking.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalTrackingComponent {
  public initialWeight = signal(80);
  public currentWeight = signal(75);
  public targetWeight = signal(70);
  public newWeekWeight = signal(0);

  public weeklyWeightLog = signal<WeeklyWeightEntry[]>([
    { week: 1, weight: 79 },
    { week: 2, weight: 78 },
    { week: 3, weight: 76 },
    { week: 4, weight: 75 },
  ]);

  public progress = computed(() => {
    const initial = this.initialWeight();
    const current = this.currentWeight();
    const target = this.targetWeight();
    if (initial === target) return 100;
    const totalToLose = initial - target;
    const lost = initial - current;
    return Math.max(0, Math.min(100, (lost / totalToLose) * 100));
  });

  public averageWeeklyLoss = computed(() => {
    const log = this.weeklyWeightLog();
    if (log.length < 2) return 0;
    const firstWeek = log[0];
    const lastWeek = log[log.length - 1];
    const weightLoss = firstWeek.weight - lastWeek.weight;
    const weeks = lastWeek.week - firstWeek.week;
    return weeks > 0 ? parseFloat((weightLoss / weeks).toFixed(2)) : 0;
  });

  public addWeeklyWeight(): void {
    if (this.newWeekWeight() > 0) {
      const newWeekNumber = (this.weeklyWeightLog()[this.weeklyWeightLog().length - 1]?.week || 0) + 1;
      this.weeklyWeightLog.update(log => [...log, { week: newWeekNumber, weight: this.newWeekWeight() }]);
      this.currentWeight.set(this.newWeekWeight());
      this.newWeekWeight.set(0);
    }
  }

  public saveGoals(): void {
    // In a real application, you would save this data to a backend service.
    console.log('Goals saved!');
    console.log('Initial Weight:', this.initialWeight());
    console.log('Current Weight:', this.currentWeight());
    console.log('Target Weight:', this.targetWeight());
  }
}
