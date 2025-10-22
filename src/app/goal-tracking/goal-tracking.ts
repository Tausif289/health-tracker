import { ChangeDetectionStrategy, Component, OnInit, signal ,ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalTrackingService,Goal, WeightEntry } from '../services/goal-tracking,service';
@Component({
  selector: 'app-goal-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-tracking.html',
  styleUrls: ['./goal-tracking.css'],
  encapsulation: ViewEncapsulation.None ,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalTrackingComponent implements OnInit {
  private defaultGoals: Goal[] = [
     { name: 'Lose 5kg', type: 'Weight', initialValue: 70, currentValue: 70, targetValue: 65, unit: 'kg', editing: false },
     { name: 'Run 10km', type: 'Distance', initialValue: 0, currentValue: 0, targetValue: 10, unit: 'km', editing: false },
     { name: 'Burn 2000 cal', type: 'Calories', initialValue: 0, currentValue: 0, targetValue: 2000, unit: 'cal', editing: false }
  ];
  public goals = signal<Goal[]>([]);
  public weeklyWeights = signal<WeightEntry[]>([]);
  public userId: string | null = null;

  public goalForm = {
    name: '',
    type: 'Weight' as 'Weight' | 'Calories' | 'Distance' | 'Duration',
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    unit: ''
  };

  constructor(private goalService: GoalTrackingService) {}

  ngOnInit() {
  // ✅ Get user data from localStorage
  const userData = localStorage.getItem('user');

  if (userData) {
    const parsedUser = JSON.parse(userData);
    this.userId = parsedUser._id; // ✅ Extract the actual user ID
  }

  if (!this.userId) {
    console.error('User ID not found in localStorage');
    return;
  }

  this.loadData();
}
  loadData() {
  if (!this.userId) return;

  this.goalService.getGoalTracking(this.userId).subscribe({
    next: (data) => {
      if (!data.goals || data.goals.length === 0) {
        // ✅ No goals found for this user, add default goals
        this.defaultGoals.forEach(goal => this.addGoal(goal));
      } else {
        // ✅ User already has goals
        this.goals.set(data.goals);
      }

      // Always set weekly weights
      this.weeklyWeights.set(data.weeklyWeights || []);
    },
    error: (err) => console.error('Error loading data:', err),
  });
}


  addGoalFromForm() {
    if (!this.userId) return;

    const newGoal: Goal = { ...this.goalForm };
    this.addGoal(newGoal);

    // Reset form
    this.goalForm = {
      name: '',
      type: 'Weight',
      initialValue: 0,
      currentValue: 0,
      targetValue: 0,
      unit: ''
    };
  }

  addGoal(goal: Goal) {
    if (!this.userId) return;

    this.goalService.addGoal(this.userId, goal).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  updateGoal(goalId: string, updatedGoal: Goal) {
    if (!this.userId) return;

    this.goalService.updateGoal(this.userId, goalId, updatedGoal).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  removeGoal(goalId: string) {
    if (!this.userId) return;

    this.goalService.removeGoal(this.userId, goalId).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  addWeightEntry(entry: WeightEntry) {
    if (!this.userId) return;

    this.goalService.addWeight(this.userId, entry).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  updateWeightEntry(entryId: string, updatedEntry: WeightEntry) {
    if (!this.userId) return;

    this.goalService.updateWeight(this.userId, entryId, updatedEntry).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  removeWeightEntry(entryId: string) {
    if (!this.userId) return;

    this.goalService.removeWeight(this.userId, entryId).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err),
    });
  }

  calculateProgress(goal: Goal): number {
    const { initialValue, currentValue, targetValue } = goal;
    const decreasing = targetValue < initialValue;
    const progress = decreasing
      ? ((initialValue - currentValue) / (initialValue - targetValue)) * 100
      : ((currentValue - initialValue) / (targetValue - initialValue)) * 100;
    return Math.max(0, Math.min(100, progress));
  }
}
