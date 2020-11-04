import { createReducer, on, Action } from '@ngrx/store';
import * as ClientiActions from './clienti.actions';

import ClientiState, { initializeState } from './clienti.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(ClientiActions.FetchClienti, (state: ClientiState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ClientiActions.SetClienti, (state: ClientiState, {payload}) => {
    return {
      ...state,
      clienti: payload,
      loading: false
    };
  }),

  on(ClientiActions.FetchClienti, (state: ClientiState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ClientiActions.UpdateClienti, (state: ClientiState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ClientiActions.UpdateClientiSuccess, (state: ClientiState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(ClientiActions.UpdateClientiFail, (state: ClientiState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(ClientiActions.CreateCliente, (state: ClientiState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ClientiActions.CreateClienteSuccess, (state: ClientiState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(ClientiActions.CreateClienteFail, (state: ClientiState, {payload}) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(ClientiActions.DeleteCliente, (state: ClientiState) => ({
    ...state,
    deleteLoading: true
  })),

  on(ClientiActions.DeleteClienteSuccess, (state: ClientiState) => ({
    ...state,
    deleteLoading: false,
    error: null
  })),

  on(ClientiActions.DeleteClienteFail, (state: ClientiState, { payload }) => ({
    ...state,
    deleteLoading: false,
    error: payload
  })),

)

export function ClientiReducer(
  state: ClientiState | undefined,
  action: Action
): ClientiState {
  return reducer(state, action);
}
