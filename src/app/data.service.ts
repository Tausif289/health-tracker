import { Injectable, signal, computed } from '@angular/core';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
}

export interface ActivityItem {
  name: string;
  caloriesBurned: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly initialBreakfast = [
    { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, mealType: 'Breakfast' },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, mealType: 'Breakfast' },
  ];

  private readonly initialLunch = [
    { name: 'Grilled Chicken Salad', calories: 350, protein: 40, carbs: 10, fat: 15, mealType: 'Lunch' },
  ];

  public foodItems = signal<FoodItem[]>([...this.initialBreakfast, ...this.initialLunch]);
  public activityItems = signal<ActivityItem[]>([]);

  public breakfastItems = computed(() => this.foodItems().filter(item => item.mealType === 'Breakfast'));
  public lunchItems = computed(() => this.foodItems().filter(item => item.mealType === 'Lunch'));
  public dinnerItems = computed(() => this.foodItems().filter(item => item.mealType === 'Dinner'));

  public intakeCalories = computed(() => this.foodItems().reduce((acc, item) => acc + item.calories, 0));
  public burnedCalories = computed(() => this.activityItems().reduce((acc, item) => acc + item.caloriesBurned, 0));

  public addFood(foodItem: FoodItem): void {
    this.foodItems.update(items => [...items, foodItem]);
  }

  public addFoods(foodItems: FoodItem[]): void {
    this.foodItems.update(items => [...items, ...foodItems]);
  }

  public addActivity(activityItem: ActivityItem): void {
    this.activityItems.update(items => [...items, activityItem]);
  }
}
