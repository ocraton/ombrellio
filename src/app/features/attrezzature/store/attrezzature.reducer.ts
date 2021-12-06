import { createReducer, on, Action } from '@ngrx/store';
import * as AttrezzatureActions from './attrezzature.actions';

import AttrezzatureState, { initializeState } from './attrezzature.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(AttrezzatureActions.FetchAttrezzature, (state: AttrezzatureState) => ({
      ...state,
      loading: true
  })),

  on(AttrezzatureActions.SetAttrezzature, (state: AttrezzatureState, {payload}) => ({
    ...state,
    attrezzatura: payload,
    loading: false
  })),

  on(AttrezzatureActions.FetchAttrezzaturaProdotti, (state: AttrezzatureState) => ({
    ...state,
    canDeleteLoading: true
  })),

  on(AttrezzatureActions.FetchAttrezzaturaProdottiSuccess, (state: AttrezzatureState, {payload}) => ({
    ...state,
    canDelete: payload,
    canDeleteLoading: false
  })),

  on(AttrezzatureActions.UpdateAttrezzatura, (state: AttrezzatureState) => ({
    ...state,
    loading: true
  })),

  on(AttrezzatureActions.UpdateAttrezzaturaSuccess, (state: AttrezzatureState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AttrezzatureActions.UpdateAttrezzaturaFail, (state: AttrezzatureState, {payload}) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(AttrezzatureActions.UpdateAttrezzature, (state: AttrezzatureState) => ({
    ...state,
    loading: false
  })),

  on(AttrezzatureActions.UpdateAttrezzatureSuccess, (state: AttrezzatureState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AttrezzatureActions.UpdateAttrezzatureFail, (state: AttrezzatureState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(AttrezzatureActions.CreateAttrezzatura, (state: AttrezzatureState) => ({
    ...state,
    loading: true
  })),

  on(AttrezzatureActions.CreateAttrezzaturaSuccess, (state: AttrezzatureState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AttrezzatureActions.CreateAttrezzaturaFail, (state: AttrezzatureState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(AttrezzatureActions.DeleteAttrezzatura, (state: AttrezzatureState) => ({
    ...state,
    loading: true
  })),

  on(AttrezzatureActions.DeleteAttrezzaturaSuccess, (state: AttrezzatureState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AttrezzatureActions.DeleteAttrezzaturaFail, (state: AttrezzatureState, {payload}) => ({
    ...state,
    loading: false,
    error: payload
  })),

)

export function AttrezzatureReducer(
  state: AttrezzatureState | undefined,
  action: Action
): AttrezzatureState {
  return reducer(state, action);
}
