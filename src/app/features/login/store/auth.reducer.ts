import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import AuthState, { initializeState } from './auth.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(AuthActions.Login, (state: AuthState) => {
    return {
      ...state,
      loading: true,
      errorMsg: null
    };
  }),

  on(AuthActions.LogInSuccess, (state: AuthState, {payload}) => {
      return {
        ...state,
        auth: {
          email: payload.email,
          password: payload.password,
          uid: payload.uid,
          chaletUID: payload.chaletUID
        },
        authenticated: true,
        loading: false,
        errorMsg: null
      };
  }),

  on(AuthActions.LogInError, (state: AuthState, { payload }) => {
    return {
      ...state,
      authenticated: false,
      loading: false,
      errorMsg: payload.errorMsg
    };
  }),

  on(AuthActions.SetChaletUID, (state: AuthState, { payload }) => {
    return {
      ...state,
      loading: false,
      auth: {
        ...state.auth,
        chaletUID: payload
      }
     };
  }),

  on(AuthActions.Logout, (state: AuthState) => {
    return {
      ...state,
      loading: false,
      authenticated: false,
      errorMsg: null
     };
  })

);

export function AuthReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}

export const getIsAuth = (state: AuthState) => state.authenticated;
export const getAuthUID = (state: AuthState) => state.auth.uid;
export const getAuthChaletUID = (state: AuthState) => state.auth.chaletUID;
