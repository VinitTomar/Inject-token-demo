import { Component, Inject, InjectionToken, Provider } from "@angular/core";
import { AbstractControl, FormControl, NgForm, NgModel } from "@angular/forms";
import { TodoService } from "./todo.service";

type FormErrMsg = {
  title: {
    required: string;
  };
  description: {
    required: string;
  };
  status: {
    required: string;
  };
};

const FormErrMsgToken = new InjectionToken<FormErrMsg>("Form err messages", {
  providedIn: "root",
  factory: () => {
    return {
      title: {
        required: "Title is required"
      },
      description: {
        required: "Description is required"
      },
      status: {
        required: "Status is required"
      }
    };
  }
});

const FormErrMsgProvider: Provider = {
  provide: FormErrMsgToken,
  useValue: {
    title: {
      required: "Please provide a title."
    },
    description: {
      required: "Please provide a description."
    },
    status: {
      required: "Please provide a status."
    }
  }
};

type errMsg = {
  [key: string]: {
    [key: string]: string | ((err: any) => string);
  };
};

@Component({
  selector: "app-add-todo",
  templateUrl: "add-todo.component.html",
  providers: [FormErrMsgProvider]
})
export class AddTodoComponent {
  constructor(
    private _todoService: TodoService,
    @Inject(FormErrMsgToken) public errMsg: FormErrMsg
  ) {}

  addTodo(form: NgForm) {
    if (!form.valid) return;
    this._todoService.addTodo(form.value);
    form.reset();
  }

  getErrorMsg(control: NgModel) {
    return this.errMsg[control.name]["required"];
  }
}
