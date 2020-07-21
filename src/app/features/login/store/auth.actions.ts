import { createAction, props } from '@ngrx/store';
import { Auth } from '../../../core/model/auth.model';

export const Login = createAction(
  '[Auth] Login',
  props < {payload: { email: string, password: string }}>()
);
export const LogInSuccess = createAction(
  '[Auth] Login Success',
  props<{ payload: Auth}>()
);
export const LogInError = createAction(
  '[Auth] Login Error',
  props<{ payload: {errorMsg}}>()
);
export const SetChaletUID = createAction(
  '[Auth] Set Chalet UID',
  props < {payload: string}>()
);
export const Logout = createAction('[Auth] Logout');
