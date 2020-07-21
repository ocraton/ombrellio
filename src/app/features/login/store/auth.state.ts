import { Auth } from '../../../core/model/auth.model';

export default class AuthState {
  auth: Auth;
  authenticated: boolean;
  loading: boolean;
  errorMsg: any | null;
}

export const initializeState = (): AuthState => {
  return {
    auth: { email: '', password: '', uid: '', chaletUID: '' },
    authenticated: false,
    loading: false,
    errorMsg: null
   };
};
