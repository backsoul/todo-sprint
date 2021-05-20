import { UserInterface } from './../../core/interfaces/user.interface';
import {
  setUser,
  removeUser,
  addTodo,
  addWorkInProgress,
  addDone,
  removeTodo,
  removeWorkInProgress,
  removeDone,
} from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

export interface State {
  user: UserInterface | any;
  sprint: any;
}

export const initialState: State = {
  user: null,
  sprint: [],
};

const _userReducer = createReducer(
  initialState,

  on(setUser, (state, { user }) => {
    return { ...state, user };
  }),
  on(removeUser, (state) => {
    return { ...state, user: null };
  }),
  on(addTodo, (state, { todo }) => {
    console.log(todo);

    let sprint = { ...state.sprint };
    if (!sprint.todos) {
      sprint.todos = [todo];
    } else {
      sprint.todos = [...sprint.todos, todo];
    }
    return { ...state, sprint };
  }),
  on(addWorkInProgress, (state, { todo }) => {
    let sprint = { ...state.sprint };
    if (!sprint.workinprogress) {
      sprint.workinprogress = [todo];
    } else {
      sprint.workinprogress = [...sprint.workinprogress, todo];
    }
    return { ...state, sprint };
  }),
  on(addDone, (state, { todo }) => {
    let sprint = { ...state.sprint };
    if (!sprint.done) {
      sprint.done = [todo];
    } else {
      sprint.done = [...sprint.done, todo];
    }
    return { ...state, sprint };
  }),
  on(removeTodo, (state, { todo }) => {
    let todos = { ...state.sprint };
    let findIndex = [...todos.todos].findIndex((a) => a === todo);
    todos.todos = [todos.todos].splice(findIndex, 0);
    return { ...state, sprint: { ...todos } };
  }),
  on(removeDone, (state, { todo }) => {
    let done = { ...state.sprint };
    let findIndex = [...done.done].findIndex((a) => a === todo);
    done.done = [done.done].splice(findIndex, 0);
    return { ...state, sprint: { ...done } };
  }),
  on(removeWorkInProgress, (state, { todo }) => {
    let workinprogress = { ...state.sprint };
    let findIndex = [...workinprogress.workinprogress].findIndex(
      (a) => a === todo
    );
    workinprogress.workinprogress = [workinprogress.workinprogress].splice(
      findIndex,
      0
    );
    return { ...state, sprint: { ...workinprogress } };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
