import { Provider } from "@angular/core";
import { Inject } from "@angular/core";
import { Component, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { toDoListProvider, TODO_LIST } from "./todo.component";
import { Todo } from "./todo.service";

type TodoStats = {
  pending: number;
  inProgress: number;
  done: number;
};

type TodoToStatsConverter = (_: Todo[]) => TodoStats;

const FROM_TODO_TO_STATS = new InjectionToken<TodoToStatsConverter>(
  "Converts an array of todos to stats"
);

const todoToStatsConverterProvider: Provider = {
  provide: FROM_TODO_TO_STATS,
  useValue: (todos: Todo[]) => {
    const stats: TodoStats = {
      pending: 0,
      inProgress: 0,
      done: 0
    };

    todos.forEach((todo) => {
      switch (todo.status) {
        case "pending":
          stats.pending++;
          break;
        case "in-progress":
          stats.inProgress++;
          break;
        case "done":
          stats.done++;
          break;
      }
    });

    return stats;
  }
};

@Component({
  selector: "app-todo-stats",
  templateUrl: "todo-stats.component.html",
  providers: [toDoListProvider, todoToStatsConverterProvider]
})
export class TodoStatsComponent {
  myTodoStats$ = this.myTodos$.pipe(map(this.converter));

  constructor(
    @Inject(TODO_LIST) public myTodos$: Observable<Todo[]>,
    @Inject(FROM_TODO_TO_STATS) public converter: TodoToStatsConverter
  ) {}
}
