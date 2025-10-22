import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTrackingComponent } from './goal-tracking';

describe('GoalTrackingComponent', () => {
  let component: GoalTrackingComponent;
  let fixture: ComponentFixture<GoalTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
