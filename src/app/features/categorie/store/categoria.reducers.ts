import { Categoria } from './../categoria.model';
import * as CategoriaActions from './categoria.actions';
import * as fromApp from '../../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  categorie: State
}

export interface State {
  categoria: Categoria[],
  canDelete: boolean,
  canDeleteLoading: boolean,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  categoria: [],
  canDelete: false,
  canDeleteLoading: false,
  loading: true,
  error: null
};

export function categoriaReducer(state = initialState, action: CategoriaActions.CategoriaActions) {
  switch (action.type) {
    case (CategoriaActions.FETCH_CATEGORIE):
      return {
        ...state,
        loading: true
      };

    case (CategoriaActions.SET_CATEGORIE):
      return {
        ...state,
        categoria: action.payload,
        loading: false
      };

    case (CategoriaActions.FETCH_CATEGORIA_PRODOTTI):
      return {
        ...state,
        canDeleteLoading: true
      };

    case (CategoriaActions.FETCH_CATEGORIA_PRODOTTI_SUCCESS):
      return {
        ...state,
        canDelete: action.payload,
        canDeleteLoading: false
      };

    case (CategoriaActions.UPDATE_CATEGORIA):
      return {
        ...state,
        loading: true
      };
    case (CategoriaActions.UPDATE_CATEGORIA_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (CategoriaActions.UPDATE_CATEGORIA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case (CategoriaActions.UPDATE_CATEGORIE):
      return {
        ...state,
        loading: false
      };
    case (CategoriaActions.UPDATE_CATEGORIE_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (CategoriaActions.UPDATE_CATEGORIE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case (CategoriaActions.CREATE_CATEGORIA):
      return {
        ...state,
        loading: true
      };
    case (CategoriaActions.CREATE_CATEGORIA_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (CategoriaActions.CREATE_CATEGORIA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case (CategoriaActions.DELETE_CATEGORIA):
      return {
        ...state,
        loading: true
      };

    case (CategoriaActions.DELETE_CATEGORIA_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (CategoriaActions.DELETE_CATEGORIA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
