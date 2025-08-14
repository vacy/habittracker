import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HabitTile } from './habit-tile/habit-tile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HabitTile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('habittracker');
}
