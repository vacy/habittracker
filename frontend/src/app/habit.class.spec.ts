import { Habit } from './habit.class';

describe('Habit', () => {
  it('should create an instance', () => {
    expect(new Habit("sport", "two times")).toBeTruthy();
  });
});
