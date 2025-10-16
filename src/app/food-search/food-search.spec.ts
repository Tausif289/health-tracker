import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSearch } from './food-search';

describe('FoodSearch', () => {
  let component: FoodSearch;
  let fixture: ComponentFixture<FoodSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
