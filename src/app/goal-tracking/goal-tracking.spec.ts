import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTracking } from './goal-tracking';

describe('GoalTracking', () => {
  let component: GoalTracking;
  let fixture: ComponentFixture<GoalTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
