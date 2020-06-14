import { Action } from '@ngrx/store';
import { Auth } from 'src/app/core/model/auth.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_ERROR = '[Auth] Login Error';
export const SET_CHALET_UID = '[Auth] Set Chalet UID';
export const LOGOUT = '[Auth] Logout';


export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string, password: string}) {}
}

export class LogInSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: Auth) { }
}

export class LogInError implements Action {
    readonly type = LOGIN_ERROR;
    constructor(public payload: { errorMsg }) { }
}

export class SetChaletUID implements Action {
  readonly type = SET_CHALET_UID;
  constructor(public payload: string) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
  }

export type AuthActions =
    | Login
    | LogInSuccess
    | LogInError
    | SetChaletUID
    | Logout;
