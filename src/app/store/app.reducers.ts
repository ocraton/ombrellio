import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../features/login/store/auth.reducers';

export interface AppState {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getAuthUID = createSelector(getAuthState, fromAuth.getAuthUID);

