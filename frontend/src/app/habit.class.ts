import { signal } from "@angular/core";

export interface StreakCheckin {
  "Streak": number[];
  "Checkin": number;
}

export class Log {
  allStreaks: number[][];
  changed = signal(false);

  constructor(allStreaks: number[][]){
    this.allStreaks = allStreaks;
  }

  readonly getLast = ():StreakCheckin => {
    const streak:number[] = this.allStreaks[this.allStreaks.length - 1];
    const checkin:number = streak[streak.length - 1] ?? 0;
    return { "Streak": streak, "Checkin": checkin };
  };

  checkin(rule: number):void {
    let last: StreakCheckin;
    const now: number = Date.now();

    last = this.getLast();

    if( ( now - last["Checkin"] ) < rule || last["Checkin"] === undefined ){
      // habit rule is matched, we keep streak, thatfor attach to current streak
      // OR
      // habit is new, empty streak was added (lastCheckin undefined)
      last["Streak"].push(now);
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


  checkin(){
    this.log.checkin(this.rule);
  }

  set setUUID(UUIDtoVerify:string){
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if(!uuidRegex.test(UUIDtoVerify)) {
      throw "UUID is invalid";
    }
    this.UUID = UUIDtoVerify;
  }
}
