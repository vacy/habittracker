import { Component, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Habit } from '../habit.class';

@Component({
  selector: 'app-add-habit',
  imports: [FormsModule],
  templateUrl: './add-habit.html',
  styleUrl: './add-habit.css'
})
export class AddHabit implements OnInit{
  public habit!: Habit;
  habitAdded = output<Habit>();
  isShown!: boolean;

  ngOnInit(): void {
    this.habit = new Habit();
    this.isShown = false;
  }

  addHabitToList(){
    this.habitAdded.emit(this.habit);
    this.habit.changed.set(true);
  }

  show(toggle: boolean = false):boolean{
    if(toggle){
      this.isShown = true ? false : true;
    }
    return this.isShown;
  };

}
