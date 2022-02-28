import { createReducer, on, Action } from '@ngrx/store';
import * as ChaletActions from './chalet.actions';

import ChaletState, { initializeState } from './chalet.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(ChaletActions.FetchChalets, (state: ChaletState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ChaletActions.SetChalets, (state: ChaletState, {payload}) => {
    return {
      ...state,
      chalet: payload,
      loading: false
    };
  }),

  on(ChaletActions.FetchChalets, (state: ChaletState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ChaletActions.UpdateChalet, (state: ChaletState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ChaletActions.UpdateChaletSuccess, (state: ChaletState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(ChaletActions.UpdateChaletFail, (state: ChaletState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(ChaletActions.CreateChalet, (state: ChaletState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ChaletActions.CreateChaletSuccess, (state: ChaletState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(ChaletActions.CreateChaletFail, (state: ChaletState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),



)

export function ChaletReducer(
  state: ChaletState | undefined,
  action: Action
): ChaletState {
  return reducer(state, action);
}
