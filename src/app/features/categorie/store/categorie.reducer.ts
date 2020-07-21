import { createReducer, on, Action } from '@ngrx/store';
import * as CategorieActions from './categorie.actions';

import CategorieState, { initializeState } from './categorie.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(CategorieActions.FetchCategorie, (state: CategorieState) => ({
      ...state,
      loading: true
  })),

  on(CategorieActions.SetCategorie, (state: CategorieState, {payload}) => ({
    ...state,
    categoria: payload,
    loading: false
  })),

  on(CategorieActions.FetchCategoriaProdotti, (state: CategorieState) => ({
    ...state,
    canDeleteLoading: true
  })),

  on(CategorieActions.FetchCategoriaProdottiSuccess, (state: CategorieState, {payload}) => ({
    ...state,
    canDelete: payload,
    canDeleteLoading: false
  })),

  on(CategorieActions.UpdateCategoria, (state: CategorieState) => ({
    ...state,
    loading: true
  })),

  on(CategorieActions.UpdateCategoriaSuccess, (state: CategorieState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(CategorieActions.UpdateCategoriaFail, (state: CategorieState, {payload}) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(CategorieActions.UpdateCategorie, (state: CategorieState) => ({
    ...state,
    loading: false
  })),

  on(CategorieActions.UpdateCategorieSuccess, (state: CategorieState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(CategorieActions.UpdateCategorieFail, (state: CategorieState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(CategorieActions.CreateCategoria, (state: CategorieState) => ({
    ...state,
    loading: true
  })),

  on(CategorieActions.CreateCategoriaSuccess, (state: CategorieState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(CategorieActions.CreateCategoriaFail, (state: CategorieState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(CategorieActions.DeleteCategoria, (state: CategorieState) => ({
    ...state,
    loading: true
  })),

  on(CategorieActions.DeleteCategoriaSuccess, (state: CategorieState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(CategorieActions.DeleteCategoriaFail, (state: CategorieState, {payload}) => ({
    ...state,
    loading: false,
    error: payload
  })),

)

export function CategorieReducer(
  state: CategorieState | undefined,
  action: Action
): CategorieState {
  return reducer(state, action);
}
