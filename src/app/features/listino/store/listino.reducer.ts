import { createReducer, on, Action } from '@ngrx/store';
import { Listino } from '../listino.model';
import * as ListinoActions from './listino.actions';

import ListinoState, { initializeState } from './listino.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(ListinoActions.FetchListino, (state: ListinoState) => ({
      ...state,
      loading: true
  })),


  on(ListinoActions.SetListino, (state: ListinoState, {payload}) => ({
    ...state,
    listino: payload,
    loading: false
  })),

  on(ListinoActions.UpdateListino, (state: ListinoState) => ({
    ...state,
    loading: true
  })),

  on(ListinoActions.UpdateListinoSuccess, (state: ListinoState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(ListinoActions.UpdateListinoFail, (state: ListinoState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(ListinoActions.CreateListino, (state: ListinoState) => ({
    ...state,
    loading: true
  })),

  on(ListinoActions.CreateListinoSuccess, (state: ListinoState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(ListinoActions.CreateListinoFail, (state: ListinoState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),


)

export function ListinoReducer(
  state: ListinoState | undefined,
  action: Action
): ListinoState {
  return reducer(state, action);
}
