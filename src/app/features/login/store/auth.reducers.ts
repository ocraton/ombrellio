import * as AuthActions from './auth.actions';
import { Auth } from 'src/app/core/model/auth.model';

export interface State {
  auth: Auth;
  authenticated: boolean;
  loading: boolean;
  errorMsg: any | null;
}

export const initialState: State = {
  auth: { email: '', password: '', uid: '', chaletUID: ''},
  authenticated: false,
  loading: false,
  errorMsg: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case (AuthActions.LOGIN): {
      return {
        ...state,
        loading: true,
        errorMsg: null
      };
    }
    case (AuthActions.LOGIN_SUCCESS): {
      return {
        ...state,
        auth: {
          email: action.payload.email,
          password: action.payload.password,
          uid: action.payload.uid,
          chaletUID: action.payload.chaletUID
        },
        authenticated: true,
        loading: false,
        errorMsg: null
      };
    }
    case (AuthActions.LOGIN_ERROR): {
      return {
        ...state,
        authenticated: false,
        loading: false,
        errorMsg: action.payload.errorMsg
      };
    }
    case (AuthActions.SET_CHALET_UID): {
      return {
        ...state,
        loading: false,
        auth: {
          ...state.auth,
          chaletUID: action.payload
        }
      };
    }
    case (AuthActions.LOGOUT):
      return {
        ...state,
        loading: false,
        authenticated: false,
        errorMsg: null
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.authenticated;
export const getAuthUID = (state: State) => state.auth.uid;
export const getAuthChaletUID = (state: State) => state.auth.chaletUID;
