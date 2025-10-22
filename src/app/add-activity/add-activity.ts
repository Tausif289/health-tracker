import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HealthDataService, ActivityItem } from '../health-data.service';

interface ActivityOption {
  activityName: string;
  caloriesPerMinute: number;
}

@Component({
  selector: 'app-add-activity',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-activity.html',
  styleUrls: ['./add-activity.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddActivityComponent {
  private router = inject(Router);
  private healthDataService = inject(HealthDataService);

  public searchTerm = signal('');
  public duration = signal(30);
  public selectedActivities = signal<ActivityItem[]>([]);
  public isModalVisible = signal(false);
  public activityToEdit = signal<ActivityOption | null>(null);

  public allActivities: ActivityOption[] = [
    { activityName: 'Running', caloriesPerMinute: 12 },
    { activityName: 'Walking', caloriesPerMinute: 5 },
    { activityName: 'Cycling', caloriesPerMinute: 10 },
    { activityName: 'Swimming', caloriesPerMinute: 8 },
    { activityName: 'Yoga', caloriesPerMinute: 4 },
    { activityName: 'Weightlifting', caloriesPerMinute: 6 },
    { activityName: 'Jumping Jacks', caloriesPerMinute: 15 },
    { activityName: 'Dancing', caloriesPerMinute: 7 },
    { activityName: 'Hiking', caloriesPerMinute: 7 },
    { activityName: 'HIIT', caloriesPerMinute: 18 },
    { activityName: 'Pilates', caloriesPerMinute: 5 },
    { activityName: 'Boxing', caloriesPerMinute: 13 },
  ];

  public filteredActivities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const selectedNames = this.selectedActivities().map(a => a.activityName);
    return this.allActivities.filter(activity => 
      !selectedNames.includes(activity.activityName) &&
      (activity.activityName.toLowerCase().includes(term) || !term)
    );
  });

  public totalCaloriesBurned = computed(() => 
    this.selectedActivities().reduce((total, activity) => total + activity.caloriesBurned, 0)
  );

  public openDurationModal(activity: ActivityOption): void {
    this.activityToEdit.set(activity);
    this.duration.set(30);
    this.isModalVisible.set(true);
  }

  public addActivityToList(): void {
    const activity = this.activityToEdit();
    if (!activity) return;

    const caloriesBurned = Math.round(activity.caloriesPerMinute * this.duration());
    const newActivity: ActivityItem = { activityName: activity.activityName, caloriesBurned };

    this.selectedActivities.update(activities => [...activities, newActivity]);
    this.closeModal();
  }

  public removeActivity(activityName: string): void {
    this.selectedActivities.update(activities => 
      activities.filter(a => a.activityName !== activityName)
    );
  }

  public async addAllToDashboard(): Promise<void> {
    if (this.selectedActivities().length > 0) {
      await this.healthDataService.addMultipleActivities(this.selectedActivities()); // backend POST
      this.selectedActivities.set([]);
      this.router.navigate(['/dashboard']);
    }
  }

  public closeModal(): void {
    this.isModalVisible.set(false);
    this.activityToEdit.set(null);
  }
}
