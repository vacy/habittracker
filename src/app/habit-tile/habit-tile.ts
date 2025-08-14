import { WeekDay } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-habit-tile',
  imports: [],
  templateUrl: './habit-tile.html',
  styleUrl: './habit-tile.css'
})
export class HabitTile {
  HABIT: string = "Sport";
  DESCRIPTION: string = "Gym zwei mal wöchentlich!";
  UUID: string = crypto.randomUUID();
  getDateNow(): number {
    const timestamp: number = Date.now();
    return timestamp;
  }
  logDone(): void {
    let timestamps: number[] = [];
    const now: number = this.getDateNow();
    timestamps.push(now);
    let json: string = JSON.stringify(timestamps);
    localStorage.setItem(this.UUID, json);
  }

  syncToStorage(input: JSON){
    alert(typeof(input) + input);
    /*
    const datum = new Date();
    datum.setTime(now);
    console.log(datum.toLocaleString());
      -
 localStorage.setItem(key, value) und sessionStorage.setItem(key, value)
setzen oder überschreiben einen Eintrag.
-
 localStorage.getItem(key) und sessionStorage.getItem(key) geben den
Wert des Schlüssels zurück oder null, wenn er nicht existiert.
-
 localStorage.removeItem(key)
 und
 sessionStorage.removeItem(key)
löschen einen Eintrag.
-
 localStorage.clear() u
    */
  }

  log = [];
}
