import { createReducer, on, Action } from '@ngrx/store';
import * as ProdottiActions from './prodotti.actions';

import ProdottiState, { initializeState } from './prodotti.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(ProdottiActions.FetchProdottiByCategoria, (state: ProdottiState) => ({
      ...state,
      loading: true
  })),

  on(ProdottiActions.FetchProdottiExist, (state: ProdottiState) => ({
      ...state,
      loading: true
  })),

  on(ProdottiActions.SetProdotti, (state: ProdottiState, {payload}) => ({
    ...state,
    prodotto: payload,
    loading: false
  })),

  on(ProdottiActions.SetProdottiExist, (state: ProdottiState, {payload}) => ({
    ...state,
    prodottoExist: payload,
    loading: false
  })),

  on(ProdottiActions.FetchProdottiCategorie, (state: ProdottiState) => ({
    ...state,
    prodottiCategorieLoading: true
  })),

  on(ProdottiActions.SetProdottiCategorie, (state: ProdottiState, {payload}) => ({
    ...state,
    prodottiCategorie: payload,
    prodottiCategorieLoading: false
  })),

  on(ProdottiActions.UpdateProdotto, (state: ProdottiState) => ({
    ...state,
    loading: true
  })),

  on(ProdottiActions.UpdateProdottoSuccess, (state: ProdottiState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(ProdottiActions.UpdateProdottoFail, (state: ProdottiState, {payload}) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(ProdottiActions.CreateProdotto, (state: ProdottiState) => ({
    ...state,
    loading: false
  })),

  on(ProdottiActions.CreateProdottoSuccess, (state: ProdottiState) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(ProdottiActions.CreateProdottoFail, (state: ProdottiState, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  })),

  on(ProdottiActions.DeleteProdotto, (state: ProdottiState) => ({
    ...state,
    deleteLoading: true
  })),

  on(ProdottiActions.DeleteProdottoSuccess, (state: ProdottiState) => ({
    ...state,
    deleteLoading: false,
    error: null
  })),

  on(ProdottiActions.DeleteProdottoFail, (state: ProdottiState, {payload}) => ({
    ...state,
    deleteLoading: false,
    error: payload
  })),

)

export function ProdottiReducer(
  state: ProdottiState | undefined,
  action: Action
): ProdottiState {
  return reducer(state, action);
}
