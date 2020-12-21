import { createReducer, on, Action } from '@ngrx/store';
import * as UtentiActions from './utenti.actions';

import UtentiState, { initializeState } from './utenti.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,


  on(UtentiActions.CreateUtente, (state: UtentiState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(UtentiActions.CreateUtenteSuccess, (state: UtentiState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(UtentiActions.CreateUtenteFail, (state: UtentiState, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),



)

export function UtentiReducer(
  state: UtentiState | undefined,
  action: Action
): UtentiState {
  return reducer(state, action);
}
