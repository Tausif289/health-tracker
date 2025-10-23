import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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
  activityName: string;
  caloriesBurned: number;
   duration: number; // ✅ add this line
}

@Injectable({ providedIn: 'root' })
export class HealthDataService {
  constructor(private http: HttpClient) {}

 private get userId(): string | null {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed._id || parsed.id || null;
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
    return null;
  }
}
 // replace dynamically if needed

  // -----------------------------
  // 🔹 Food & Nutrient Tracking
  // -----------------------------
  public foodItems = signal<FoodItem[]>([]);

  public breakfastItems = computed(() =>
    this.foodItems().filter(i => i.mealType === 'breakfast')
  );
  public lunchItems = computed(() =>
    this.foodItems().filter(i => i.mealType === 'lunch')
  );
  public dinnerItems = computed(() =>
    this.foodItems().filter(i => i.mealType === 'dinner')
  );

  // ✅ Totals
  public intakeCalories = computed(() =>
    this.foodItems().reduce((acc, i) => acc + i.calories, 0)
  );
  
  // ✅ Automatically compute protein, carbs, and fat
  public protein = computed(() =>
    this.foodItems().reduce((acc, i) => acc + (i.protein || 0), 0)
  );
  public carbs = computed(() =>
    this.foodItems().reduce((acc, i) => acc + (i.carbs || 0), 0)
  );
  public fat = computed(() =>
    this.foodItems().reduce((acc, i) => acc + (i.fat || 0), 0)
  );

  // -----------------------------
  // 🔹 Activities
  // -----------------------------
  public activityItems = signal<ActivityItem[]>([]);
  public burnedCalories = computed(() =>
    this.activityItems().reduce((acc, i) => acc + i.caloriesBurned, 0)
  );
  public waterIntake = signal<number>(0); 
  // -----------------------------
  // 🔹 Fetch Data from Backend
  // -----------------------------
  public async fetchAllLogs() {
  if (!this.userId) {
    console.warn('⚠️ No userId found in localStorage');
    return;
  }
    const url = `http://localhost:4000/api/food/${this.userId}`;
    const data: any = await lastValueFrom(this.http.get(url));
    const foodLog = data.userFood?.foodLog || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayLog = foodLog.find((day: any) => {
      const logDate = new Date(day.date);
      logDate.setHours(0, 0, 0, 0);
      return logDate.getTime() === today.getTime();
    });

    if (!todayLog) {
      console.warn('⚠️ No log found for today');
      this.foodItems.set([]);
      this.activityItems.set([]);
      this.waterIntake.set(0);
      return;
    }

    // Flatten today's meals
    const allFood: FoodItem[] = [
      ...(todayLog.breakfast?.map((f: FoodItem) => ({ ...f, mealType: 'breakfast' })) || []),
      ...(todayLog.lunch?.map((f: FoodItem) => ({ ...f, mealType: 'lunch' })) || []),
      ...(todayLog.dinner?.map((f: FoodItem) => ({ ...f, mealType: 'dinner' })) || []),
    ];
    this.foodItems.set(allFood);

    // Flatten today's activities
    const allActivities: ActivityItem[] = [...(todayLog.activities || [])];
    this.activityItems.set(allActivities);

    this.waterIntake.set(todayLog.waterIntake || 0); 

    console.log('✅ Loaded today’s data:', { todayLog, allFood, allActivities });
  }

  // -----------------------------
  // 🔹 Add Food & Update Nutrients
  // -----------------------------
  public async addFoodItem(item: FoodItem) {
  if (!this.userId) {
    console.error('❌ Cannot add food: userId missing');
    return;
  }
    const url = 'http://localhost:4000/api/food/addFood';
    await lastValueFrom(
      this.http.post(url, {
        userId: this.userId,
        username: 'tausif', // replace dynamically
        mealType: item.mealType,
        foodItem: item,
      })
    );

    // Update frontend immediately
    this.foodItems.update(items => [...items, item]);
  }

  // -----------------------------
  // 🔹 Add Activity
  // -----------------------------
  public async addActivityItem(item: ActivityItem) {
    const url = 'http://localhost:4000/api/food/addActivity';
    await lastValueFrom(
      this.http.post(url, {
        userId: this.userId,
        username: 'tausif', // replace dynamically
        activity: item,
      })
    );
    this.activityItems.update(items => [...items, item]);
  }

  public addMultipleActivities(items: ActivityItem[]) {
    items.forEach(item => this.addActivityItem(item));
  }

  // ✅ Add water intake
  public async addWater(amount: number) {
    const url = 'http://localhost:4000/api/food/addWater';
    await lastValueFrom(this.http.post(url, {
      userId: this.userId,
      username: 'tausif',
      amount, // ml of water
    }));

    // Update locally
    this.waterIntake.update(v => v + amount);
  }
}
