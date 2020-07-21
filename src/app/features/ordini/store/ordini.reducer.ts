import { createReducer, on, Action } from '@ngrx/store';
import * as OrdiniActions from './ordini.actions';

import OrdiniState, { initializeState } from './ordini.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(OrdiniActions.FetchOrdini, (state: OrdiniState) => ({
      ...state,
      loading: true
  })),

  on(OrdiniActions.SetOrdini, (state: OrdiniState, {payload}) => ({
    ...state,
    ordine: payload,
    loading: false
  })),

  on(OrdiniActions.SetCountOrdini, (state: OrdiniState, {payload}) => ({
    ...state,
    ordiniCount: payload,
    loading: false
  })),

  on(OrdiniActions.FetchOrdine, (state: OrdiniState) => ({
      ...state,
      loading: true
  })),

  on(OrdiniActions.SetOrdine, (state: OrdiniState, {payload}) => ({
    ...state,
    ordine: payload[0],
    loading: false
  })),

  on(OrdiniActions.FetchCountOrdini, (state: OrdiniState) => ({
      ...state,
      loading: true
  })),

  on(OrdiniActions.UpdateOrdine, (state: OrdiniState) => ({
      ...state
  })),

  on(OrdiniActions.UpdateOrdineSuccess, (state: OrdiniState) => ({
      ...state,
      error: null
  })),

  on(OrdiniActions.UpdateOrdineFail, (state: OrdiniState, {payload}) => ({
      ...state,
      error: payload
  })),

  on(OrdiniActions.FilterOrdini, (state: OrdiniState, { numOmbrellone }) => ({
      ...state,
      ordine: state.ordine.filter(function (item) {
        return item.numero_ombrellone == numOmbrellone
      }),
      loading: false,
  }))

)

export function OrdiniReducer(
  state: OrdiniState | undefined,
  action: Action
): OrdiniState {
  return reducer(state, action);
}
