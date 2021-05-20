import { UserInterface } from './../../core/interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[SET USER] USER',
  props<{ user: UserInterface }>()
);

export const removeUser = createAction('[REMOVE USER] USER');

export const addTodo = createAction(
  '[ADD TODO] TODO',
  props<{ todo: string }>()
);
export const setTodo = createAction(
  '[SET TODO] TODO',
  props<{ todos: any[] }>()
);
export const setWorkInProgress = createAction(
  '[SET WORK IN PROGRESS] WORK',
  props<{ todos: any[] }>()
);
export const setDone = createAction(
  '[SET DONE] DONE',
  props<{ todos: any[] }>()
);
export const removeTodo = createAction(
  '[REMOVE TODO] TODO',
  props<{ todo: string }>()
);
export const removeWorkInProgress = createAction(
  '[REMOVE WORKING IN PROGRESS] WORKING IN PROGRESS',
  props<{ todo: string }>()
);
export const removeDone = createAction(
  '[REMOVE DONE] DONE',
  props<{ todo: string }>()
);
export const addWorkInProgress = createAction(
  '[ADD WORKING IN PROGRESS] WORKING IN PROGRESS',
  props<{ todo: string }>()
);

export const addDone = createAction(
  '[ADD DONE] DONE',
  props<{ todo: string }>()
);
