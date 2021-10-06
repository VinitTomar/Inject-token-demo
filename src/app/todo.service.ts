import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Todo {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
}

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private _todos: Todo[] = [
    { title: "Todo 1", description: "Detail of todo 1", status: "pending" },
    { title: "Todo 2", description: "Detail of todo 2", status: "pending" },
    { title: "Todo 3", description: "Detail of todo 3", status: "in-progress" },
    { title: "Todo 4", description: "Detail of todo 4", status: "in-progress" },
    { title: "Todo 5", description: "Detail of todo 5", status: "done" },
    { title: "Todo 6", description: "Detail of todo 6", status: "done" }
  ];

  private _todoSubject = new BehaviorSubject<Todo[]>(this._todos);

  get todos$() {
    return this._todoSubject.asObservable();
  }

  addTodo(todo: Todo) {
    this._todoSubject.next([todo, ...this._todoSubject.value]);
  }
}
