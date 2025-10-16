import { Injectable, signal, computed } from '@angular/core';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  quantity: number;
}

export interface ActivityItem {
  name: string;
  caloriesBurned: number;
}

@Injectable({
  providedIn: 'root',
})
export class HealthDataService {
  // Food items
  public foodItems = signal<FoodItem[]>([]);

  public breakfastItems = computed(() => this.foodItems().filter(item => item.mealType === 'breakfast'));
  public lunchItems = computed(() => this.foodItems().filter(item => item.mealType === 'lunch'));
  public dinnerItems = computed(() => this.foodItems().filter(item => item.mealType === 'dinner'));

  public intakeCalories = computed(() => this.foodItems().reduce((acc, item) => acc + (item.calories * item.quantity), 0));

  public addFoodItem(item: FoodItem) {
    this.foodItems.update(items => [...items, item]);
  }

  // Activity items
  public activityItems = signal<ActivityItem[]>([]);
  public burnedCalories = computed(() => this.activityItems().reduce((acc, item) => acc + item.caloriesBurned, 0));

  public addActivityItem(item: ActivityItem) {
    this.activityItems.update(items => [...items, item]);
  }
  
  public addMultipleActivities(items: ActivityItem[]) {
    this.activityItems.update(currentItems => [...currentItems, ...items]);
  }
}
