import { Component, effect, input } from '@angular/core';
import { Habit } from '../habit.class';

@Component({
  selector: 'app-habit-tile',
  imports: [],
  templateUrl: './habit-tile.html',
  styleUrl: './habit-tile.css'
})
export class HabitTile {
  habit = input<Habit>();

  getDateNow(): number {
    const timestamp: number = Date.now();
    return timestamp;
  }
  logDone(): void {
    let timestamps: number[] = [];
    const now: number = this.getDateNow();
    timestamps.push(now);
  }

  log = [];

  constructor(){
    effect(():void => {
      localStorage.setItem(this.habit()!.UUID, JSON.stringify(this.habit()));
    });
  }
}
