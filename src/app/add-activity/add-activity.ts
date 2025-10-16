import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HealthDataService, ActivityItem } from '../health-data.service';

interface ActivityOption {
  name: string;
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
    { name: 'Running', caloriesPerMinute: 12 },
    { name: 'Walking', caloriesPerMinute: 5 },
    { name: 'Cycling', caloriesPerMinute: 10 },
    { name: 'Swimming', caloriesPerMinute: 8 },
    { name: 'Yoga', caloriesPerMinute: 4 },
    { name: 'Weightlifting', caloriesPerMinute: 6 },
    { name: 'Jumping Jacks', caloriesPerMinute: 15 },
    { name: 'Dancing', caloriesPerMinute: 7 },
    { name: 'Hiking', caloriesPerMinute: 7 },
    { name: 'HIIT', caloriesPerMinute: 18 },
    { name: 'Pilates', caloriesPerMinute: 5 },
    { name: 'Boxing', caloriesPerMinute: 13 },
  ];

  public filteredActivities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const selectedNames = this.selectedActivities().map(a => a.name);
    return this.allActivities.filter(activity => 
      !selectedNames.includes(activity.name) &&
      (activity.name.toLowerCase().includes(term) || !term)
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
    const newActivity: ActivityItem = { name: activity.name, caloriesBurned };

    this.selectedActivities.update(activities => [...activities, newActivity]);
    this.closeModal();
  }

  public removeActivity(activityName: string): void {
    this.selectedActivities.update(activities => 
      activities.filter(a => a.name !== activityName)
    );
  }

  public addAllToDashboard(): void {
    if (this.selectedActivities().length > 0) {
      this.healthDataService.addMultipleActivities(this.selectedActivities());
      this.selectedActivities.set([]);
      this.router.navigate(['/dashboard']);
    }
  }

  public closeModal(): void {
    this.isModalVisible.set(false);
    this.activityToEdit.set(null);
  }
}
