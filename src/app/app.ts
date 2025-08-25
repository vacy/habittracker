import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HabitTile } from './habit-tile/habit-tile';
import { Habit } from './habit.class';
import { AddHabit } from "./add-habit/add-habit";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HabitTile, AddHabit ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  listOfHabits: Habit[] = [];
  showAddHabitDialog:boolean = false;

  ngOnInit(): void {
    this.listOfHabits.push.apply(this.listOfHabits, this.getHabitsFromLocalstorage());
  }

  readonly getHabitsFromLocalstorage = ():Habit[] => {
    let list:Habit[] = [];
    for(let index=0; index < localStorage.length; index++ ){
      const key = localStorage.key(index);
      const item = JSON.parse(localStorage.getItem(key!)!);
      const habit: Habit = new Habit(item.title, item.description, item.UUID);
      list.push(habit);
    }
    return list;
  }

  appendToHabitList(habit:Habit) {
    this.listOfHabits.push(habit);
    this.showAddHabitDialog = false;
  }

  protected readonly title = signal('habittracker');
}
