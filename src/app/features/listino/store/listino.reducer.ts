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


)

export function ListinoReducer(
  state: ListinoState | undefined,
  action: Action
): ListinoState {
  return reducer(state, action);
}
