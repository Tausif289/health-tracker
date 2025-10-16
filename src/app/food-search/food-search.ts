import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HealthDataService, FoodItem } from '../health-data.service';
import { FOOD_DATA } from '../food-data';

@Component({
  selector: 'app-food-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './food-search.html',
  styleUrls: ['./food-search.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodSearchComponent {
  private router = inject(Router);
  private healthDataService = inject(HealthDataService);

  public searchTerm = signal('');
  public selectedFoods = signal<Omit<FoodItem, 'mealType'>[]>([]);
  public isModalVisible = signal(false);

  private allFoods = FOOD_DATA;

  public filteredFoods = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return [];
    }
    const selectedNames = this.selectedFoods().map(f => f.name);
    return this.allFoods.filter((food) =>
      food.name.toLowerCase().includes(term) && !selectedNames.includes(food.name)
    );
  });

  public totalSelectedCalories = computed(() => 
    this.selectedFoods().reduce((total, food) => total + food.calories, 0)
  );

  public addFood(food: Omit<FoodItem, 'mealType'>): void {
    this.selectedFoods.update(foods => [...foods, food]);
  }

  public removeFood(food: Omit<FoodItem, 'mealType'>): void {
    this.selectedFoods.update(foods => foods.filter(f => f.name !== food.name));
  }

  public showMealSelection(): void {
    if (this.selectedFoods().length > 0) {
      this.isModalVisible.set(true);
    }
  }

  public assignToMeal(mealType: 'breakfast' | 'lunch' | 'dinner'): void {
    const itemsToAdd = this.selectedFoods().map(food => ({ ...food, mealType }));
    itemsToAdd.forEach(item => this.healthDataService.addFoodItem(item));
    this.selectedFoods.set([]);
    this.isModalVisible.set(false);
    this.router.navigate(['/dashboard']);
  }

  public closeModal(): void {
    this.isModalVisible.set(false);
  }
}
