import { createReducer, on, Action } from '@ngrx/store';
import * as TavoliActions from './tavoli.actions';

import TavoliState, { initializeState } from './tavoli.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(TavoliActions.FetchTavoli, (state: TavoliState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TavoliActions.SetTavoli, (state: TavoliState, {payload}) => {
    return {
      ...state,
      tavoli: payload,
      loading: false
    };
  }),

  on(TavoliActions.FetchTavoli, (state: TavoliState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TavoliActions.UpdateTavoli, (state: TavoliState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TavoliActions.UpdateTavoliSuccess, (state: TavoliState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(TavoliActions.UpdateTavoliFail, (state: TavoliState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(TavoliActions.CreateTavolo, (state: TavoliState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TavoliActions.CreateTavoloSuccess, (state: TavoliState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(TavoliActions.CreateTavoloFail, (state: TavoliState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(TavoliActions.DeleteTavolo, (state: TavoliState) => ({
    ...state,
    deleteLoading: true
  })),

  on(TavoliActions.DeleteTavoloSuccess, (state: TavoliState) => ({
    ...state,
    deleteLoading: false,
    error: null
  })),

  on(TavoliActions.DeleteTavoloFail, (state: TavoliState, { payload }) => ({
    ...state,
    deleteLoading: false,
    error: payload
  })),

)

export function TavoliReducer(
  state: TavoliState | undefined,
  action: Action
): TavoliState {
  return reducer(state, action);
}
