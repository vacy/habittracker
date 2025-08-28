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

  logDone(): void {
    this.habit()?.stamp();
  }

  log = [];

  constructor(){
    effect(():void => {
      if(this.habit()?.changed() || this.habit()?.log.changed()){
        console.log("writing changes in habit: ", this.habit()?.title, " to localStorage...", this.habit());
        localStorage.setItem(this.habit()!.UUID, JSON.stringify(this.habit()));
        this.habit()?.changed.set(false);
        this.habit()?.log.changed.set(false);
      }
    });
  }
}
