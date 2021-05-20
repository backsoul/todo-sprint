import { UserInterface } from './../../core/interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[SET USER] USER',
  props<{ user: UserInterface }>()
);

export const removeUser = createAction('[REMOVE USER] USER');
