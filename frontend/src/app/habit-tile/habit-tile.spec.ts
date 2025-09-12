import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTile } from './habit-tile';

describe('HabitTile', () => {
  let component: HabitTile;
  let fixture: ComponentFixture<HabitTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldReturnDate', () => {
    const date = component.getDateNow();
    expect(date).toBeGreaterThan(1755181662541);
    expect(date).toBeLessThan(3755181662541);
  })
});
