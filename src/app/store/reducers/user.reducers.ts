import { UserInterface } from './../../core/interfaces/user.interface';
import { setUser, removeUser } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  user: UserInterface | any;
}

export const initialState: State = {
  user: null,
};

const _userReducer = createReducer(
  initialState,

  on(setUser, (state, { user }) => {
    return { ...state, user };
  }),
  on(removeUser, (state) => {
    return { ...state, user: null };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
