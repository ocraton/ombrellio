import { createReducer, on, Action } from '@ngrx/store';
import * as OmbrelloniActions from './ombrelloni.actions';

import OmbrelloniState, { initializeState } from './ombrelloni.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(OmbrelloniActions.FetchOmbrelloni, (state: OmbrelloniState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(OmbrelloniActions.SetOmbrelloni, (state: OmbrelloniState, {payload}) => {
    return {
      ...state,
      ombrelloni: payload,
      loading: false
    };
  }),

  on(OmbrelloniActions.FetchOmbrelloni, (state: OmbrelloniState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(OmbrelloniActions.FetchOmbrelloniMappa, (state: OmbrelloniState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(OmbrelloniActions.SetOmbrelloniMappa, (state: OmbrelloniState, { payload }) => {
    return {
      ...state,
      mappa: payload[0],
      loading: false
    };
  }),

  on(OmbrelloniActions.UpdateOmbrelloni, (state: OmbrelloniState, { payload }) => {
    return {
      ...state,
    };
  }),

  on(OmbrelloniActions.UpdateOmbrelloniSuccess, (state: OmbrelloniState) => {
    return {
      ...state,
      error: null
    };
  }),

  on(OmbrelloniActions.UpdateOmbrelloniFail, (state: OmbrelloniState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(OmbrelloniActions.CreateOmbrellone, (state: OmbrelloniState) => {
    return {
      ...state,
    };
  }),

  on(OmbrelloniActions.CreateOmbrelloneSuccess, (state: OmbrelloniState) => {
    return {
      ...state,
      error: null
    };
  }),

  on(OmbrelloniActions.CreateOmbrelloneFail, (state: OmbrelloniState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(OmbrelloniActions.DeleteOmbrellone, (state: OmbrelloniState) => ({
    ...state,
    deleteLoading: true
  })),

  on(OmbrelloniActions.DeleteOmbrelloneSuccess, (state: OmbrelloniState) => ({
    ...state,
    deleteLoading: false,
    error: null
  })),

  on(OmbrelloniActions.DeleteOmbrelloneFail, (state: OmbrelloniState, { payload }) => ({
    ...state,
    deleteLoading: false,
    error: payload
  })),

)

export function OmbrelloniReducer(
  state: OmbrelloniState | undefined,
  action: Action
): OmbrelloniState {
  return reducer(state, action);
}
