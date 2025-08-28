import { effect, signal } from "@angular/core";

export class Log {
  allStreaks: number[][];
  changed = signal(false);

  constructor(allStreaks: number[][]){
    this.allStreaks = allStreaks;
  }

  stamp(rule: number):void {
    let lastStreak: number[];
    let lastStamp: number;
    const now: number = Date.now();

    const getLast = (list:number[][]|number[]) => {return list[list.length - 1]};
    lastStreak = getLast(this.allStreaks) as number[];
    lastStamp = getLast(lastStreak) as number;

    if( ( now - lastStamp ) < rule || lastStamp === undefined ){
      // habit rule is matched, we keep streak, thatfor attach to current streak
      // OR
      // habit is new, empty streak was added (lastStamp undefined)
      lastStreak.push(now);
    } else {
      // habit rule is missed, we broke streak, thatfor attach a new streak
      this.allStreaks.push([now]);
    }
    this.changed.set(true);
  }
}

export class Habit {
  title: string;
  description: string;
  UUID!: string;
  log: Log;
  rule: number = 86400 * 1000; // 86400 == 24hrs in ms
  changed = signal(false);

  constructor(title: string="", description: string="", UUID: string = crypto.randomUUID(), log: number[][] = [[]]){
    this.title = title;
    this.description = description;
    this.UUID = UUID;
    this.log = new Log(log);
  }


  stamp(){
    this.log.stamp(this.rule);
  }

  set setUUID(UUIDtoVerify:string){
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if(!uuidRegex.test(UUIDtoVerify)) {
      throw "UUID is invalid";
    }
    this.UUID = UUIDtoVerify;
  }
}
