import { ActionReducerMap } from '@ngrx/store';
import { UserInterface } from '../core/interfaces/user.interface';
import * as actions from './reducers/index.reducers';

export interface AppState {
  user: UserInterface | any;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: actions.userReducer,
};
