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
  public isModalVisible = signal(false); // For meal selection
  public isQuantityModalVisible = signal(false); // NEW: For quantity popup
  public selectedFoodForQuantity = signal<Omit<FoodItem, 'mealType'> | null>(null); // NEW
  public quantity = signal<number>(1); // NEW

  private allFoods = FOOD_DATA;

  public filteredFoods = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const selectedNames = this.selectedFoods().map(f => f.name);
    return this.allFoods.filter(
      (food) => food.name.toLowerCase().includes(term) && !selectedNames.includes(food.name)
    );
  });

  public totalSelectedCalories = computed(() =>
    this.selectedFoods().reduce((total, food) => total + food.calories, 0)
  );

  // OPEN QUANTITY POPUP
  public addFood(food: Omit<FoodItem, 'mealType'>): void {
    this.selectedFoodForQuantity.set(food);
    this.quantity.set(1); // default
    this.isQuantityModalVisible.set(true);
  }

  // CONFIRM QUANTITY AND ADD FOOD
  public confirmQuantity(): void {
    const food = this.selectedFoodForQuantity();
    const qty = this.quantity();

    if (food) {
      const adjustedFood = {
        ...food,
        calories: food.calories * qty,
        protein: food.protein * qty,
        carbs: food.carbs * qty,
        fat: food.fat * qty,
      };

      this.selectedFoods.update((foods) => [...foods, adjustedFood]);
    }

    this.closeQuantityModal();
  }

  // CLOSE QUANTITY MODAL
  public closeQuantityModal(): void {
    this.isQuantityModalVisible.set(false);
    this.selectedFoodForQuantity.set(null);
    this.quantity.set(1);
  }

  // REMOVE FOOD
  public removeFood(food: Omit<FoodItem, 'mealType'>): void {
    this.selectedFoods.update((foods) => foods.filter((f) => f.name !== food.name));
  }

  // SHOW MEAL SELECTION MODAL
  public showMealSelection(): void {
    if (this.selectedFoods().length > 0) {
      this.isModalVisible.set(true);
    }
  }

  // ASSIGN SELECTED FOODS TO MEAL
  public async assignToMeal(mealType: 'breakfast' | 'lunch' | 'dinner'): Promise<void> {
    const itemsToAdd = this.selectedFoods().map((food) => ({ ...food, mealType }));
    for (const item of itemsToAdd) {
      await this.healthDataService.addFoodItem(item); // backend POST
    }
    this.selectedFoods.set([]);
    this.isModalVisible.set(false);
    this.router.navigate(['/dashboard']);
  }

  public closeModal(): void {
    this.isModalVisible.set(false);
  }
}
