import * as ProdottoActions from './prodotto.actions';
import * as fromApp from '../../../store/app.reducers';
import { Prodotto } from '../prodotto.model';
import { Categoria } from '../../categorie/categoria.model';

export interface FeatureState extends fromApp.AppState {
  prodotti: State
}

export interface State {
  prodotto: Prodotto[],
  prodottiCategorie: Categoria[],
  prodottiCount: number,
  loading: boolean,
  deleteLoading: boolean,
  prodottiCategorieLoading: boolean;
  prodottoExist: Prodotto[]
  error: any | null;
}

const initialState: State = {
  prodotto: [],
  prodottoExist: [],
  prodottiCategorie: [],
  prodottiCount: 0,
  loading: true,
  deleteLoading: false,
  prodottiCategorieLoading: true,
  error: null
};

export function prodottoReducer(state = initialState, action: ProdottoActions.ProdottoActions) {
  switch (action.type) {

    case (ProdottoActions.FETCH_PRODOTTI_BY_CATEGORIA):
      return {
        ...state,
        loading: true
      };

    case (ProdottoActions.FETCH_PRODOTTI_EXIST):
      return {
        ...state,
        loading: true
      };

    case (ProdottoActions.SET_PRODOTTI):
      return {
        ...state,
        prodotto: action.payload,
        loading: false
      };

    case (ProdottoActions.SET_PRODOTTI_EXIST):
      return {
        ...state,
        prodottoExist: action.payload,
        loading: false
      };

    case (ProdottoActions.FETCH_PRODOTTI_CATEGORIE):
      return {
        ...state,
        prodottiCategorieLoading: true
      };

    case (ProdottoActions.SET_PRODOTTI_CATEGORIE):
      return {
        ...state,
        prodottiCategorie: action.payload,
        prodottiCategorieLoading: false
      };

    case (ProdottoActions.UPDATE_PRODOTTO):
      return {
        ...state,
        loading: true
      };
    case (ProdottoActions.UPDATE_PRODOTTO_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (ProdottoActions.UPDATE_PRODOTTO_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case (ProdottoActions.CREATE_PRODOTTO):
      return {
        ...state,
        loading: true
      };
    case (ProdottoActions.CREATE_PRODOTTO_SUCCESS):
      return {
        ...state,
        loading: false,
        error: null
      };
    case (ProdottoActions.CREATE_PRODOTTO_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case (ProdottoActions.DELETE_PRODOTTO):
      return {
        ...state,
        deleteLoading: true
      };

    case (ProdottoActions.DELETE_PRODOTTO_SUCCESS):
      return {
        ...state,
        deleteLoading: false,
        error: null
      };
    case (ProdottoActions.DELETE_PRODOTTO_FAIL):
      return {
        ...state,
        deleteLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
