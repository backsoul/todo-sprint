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
  setTodo,
  setWorkInProgress,
  setDone,
  changeLoading,
} from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

export interface State {
  user: UserInterface | any;
  sprint: any;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  sprint: [],
  loading: false,
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
    let todosData = { ...state.sprint };
    todosData.todos = todosData.todos.filter((a: any) => a !== todo);
    return { ...state, sprint: { ...todosData } };
  }),
  on(removeDone, (state, { todo }) => {
    let dones = { ...state.sprint };
    dones.done = [...dones.done].filter((a) => a !== todo);
    return { ...state, sprint: { ...dones } };
  }),
  on(removeWorkInProgress, (state, { todo }) => {
    let work = { ...state.sprint };
    work.workinprogress = [...work.workinprogress].filter((a) => a !== todo);
    return { ...state, sprint: { ...work } };
  }),
  on(setTodo, (state, { todos }) => {
    const todoData = { ...state.sprint };
    todoData.todos = todos;
    return { ...state, sprint: { ...todoData } };
  }),
  on(setWorkInProgress, (state, { todos }) => {
    const workinprogressData = { ...state.sprint };
    workinprogressData.workinprogress = todos;
    return { ...state, sprint: { ...workinprogressData } };
  }),
  on(setDone, (state, { todos }) => {
    const doneData = { ...state.sprint };
    doneData.done = todos;
    return { ...state, sprint: { ...doneData } };
  }),
  on(changeLoading, (state, { loading }) => {
    return { ...state, loading };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
