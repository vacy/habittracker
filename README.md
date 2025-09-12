# Habittracker
habittracking - but forgiving. Can't miss a streak? revive it and build momentum!

## Classes
```mermaid
---
title: class diagram
---
classDiagram
    Habit "1" <.. "1" Log : implements

    class Habit{ 
      %%<<Interface>>%%
      +integer               ID
      +string                 title
      +string                 description
      +Log                    log
      +time                   rule
      +signal~bool~     changed 
      +checkin()
      +setID(IDtoVerify string)
    } 

    class Log{ 
      %%<<Service>>%%
      +Array~number~        allStreaks
      +signal~bool~             changed 
      +getLast() Tuple~StreakCheckin~
      +checkin(rule StreakCheckin as Tuple)
    }
```

## Backend
### Database
```mermaid
---
title: Habit Database Entity Relationship Diagram
---
erDiagram
    Habit ||..o{ Streak : has
    Habit ||..o{ Checkin : "relates to"
    Streak ||..o{ Checkin : has

    Habit {
      serial ID PK
      bigint(20) lastStreak FK
      tinytext title
      text description
      enum type "pro/anti habit"
      time rule "how often it needs to be checked in to streak"
    }

    Streak {
      serial ID PK
      bigint(20) Habit PK,FK
      timestamp firstCheckin FK "sorting purpose"
      timestamp lastCheckin FK "-> ? currentCheckin - lastCheckin < rule"
    }

    Checkin {
      serial ID PK
      bigint(20) Habit PK,FK
      bigint(20) Streak PK,FK
      timestamp date
      enum impact "positive or negative to evaluate a momentum in the habit"
    }
```

## Requirements

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
