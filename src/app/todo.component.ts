import { Component, Inject, InjectionToken, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo, TodoService } from "./todo.service";

export const TODO_LIST = new InjectionToken<Observable<Todo[]>>(
  "List of all todos"
);
export const toDoListProvider: Provider = {
  provide: TODO_LIST,
  deps: [TodoService],
  useFactory: (service: TodoService) => {
    return service.todos$;
  }
};

const PENDING_TODOS = new InjectionToken<Observable<Todo[]>>("Pending todos");
const pendingTodosProvider: Provider = {
  provide: PENDING_TODOS,
  deps: [TodoService],
  useFactory: (todoService: TodoService) => {
    return todoService.todos$.pipe(
      map((todo) => todo.filter((todo) => todo.status === "pending"))
    );
  }
};

const DONE_TODOS = new InjectionToken<Observable<Todo[]>>("Done todos");
const doneTodosProvider: Provider = {
  provide: DONE_TODOS,
  deps: [TodoService],
  useFactory: (todoService: TodoService) => {
    return todoService.todos$.pipe(
      map((todo) => todo.filter((todo) => todo.status === "done"))
    );
  }
};

@Component({
  selector: "app-todos",
  templateUrl: "todo.component.html",
  providers: [toDoListProvider, pendingTodosProvider, doneTodosProvider]
})
export class TodoComponent {
  constructor(
    @Inject(TODO_LIST) public myTodos$: Observable<Todo[]>,
    @Inject(PENDING_TODOS) public pendingTodos$: Observable<Todo[]>,
    @Inject(DONE_TODOS) public doneTodos$: Observable<Todo[]>
  ) {}
}
