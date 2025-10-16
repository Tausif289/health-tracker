import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivity } from './add-activity';

describe('AddActivity', () => {
  let component: AddActivity;
  let fixture: ComponentFixture<AddActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
