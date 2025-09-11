import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HabitTile } from './habit-tile/habit-tile';
import { Habit, StreakCheckin } from './habit.class';
import { AddHabit } from "./add-habit/add-habit";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HabitTile, AddHabit ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  allHabits = signal<Habit[]>([]);
  showAddHabitDialog:boolean = false;

  filterDue = signal("all");
  filteredHabits = computed(():Habit[] => {
    const now: number = Date.now();
    const filteredHabits: Habit[] = [];
    this.allHabits().forEach(habit => {
      const last: StreakCheckin = habit.log.getLast();
      const dueBy: number = last["Checkin"] + habit.rule;
      switch(this.filterDue()){
        case "all":
          filteredHabits.push(habit);
          break;
        case "due":
          if( dueBy >= now ){
            filteredHabits.push(habit);
          };
          break;
        case "missed":
          if( dueBy < now ){
            filteredHabits.push(habit);
          };
          break;
      }
    });
    return filteredHabits;
  });

  ngOnInit(): void {
    this.allHabits.update(allHabits => [ ...allHabits, ...this.getHabitsFromLocalstorage() ] );
  }

  readonly getHabitsFromLocalstorage = ():Habit[] => {
    let allHabits:Habit[] = [];
    for(let index=0; index < localStorage.length; index++ ){
      // might run into type problems here if localStorage contains other than the expected entries
      // possible fix: filter the for loops input data
      const key = localStorage.key(index);
      const item = JSON.parse(localStorage.getItem(key!)!);
      item.log = Object.values(item.log).flat();
      const habit: Habit = new Habit(item.title, item.description, item.UUID, item.log);
      allHabits.push(habit);
    }
    return allHabits;
  }

  appendToHabitList(habit:Habit) {
    this.allHabits.update(habits => [...habits, habit]);
    this.showAddHabitDialog = false;
  }

  protected readonly title = signal('habittracker');
}
