import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromAuth from '../features/login/store/auth.reducer';
import * as authState from '../features/login/store/auth.state';

import * as fromChalet from '../features/chalet/store/chalet.reducer';
import * as chaletState from '../features/chalet/store/chalet.state';

import * as fromOrdini from '../features/ordini/store/ordini.reducer';
import * as ordiniState from '../features/ordini/store/ordini.state';

import * as fromCategorie from '../features/categorie/store/categorie.reducer';
import * as categorieState from '../features/categorie/store/categorie.state';

import * as fromProdotti from '../features/prodotti/store/prodotti.reducer';
import * as prodottiState from '../features/prodotti/store/prodotti.state';

export interface AppState {
  auth: authState.default;
  chalet: chaletState.default;
  ordini: ordiniState.default;
  categorie: categorieState.default;
  prodotti: prodottiState.default;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  chalet: fromChalet.ChaletReducer,
  ordini: fromOrdini.OrdiniReducer,
  categorie: fromCategorie.CategorieReducer,
  prodotti: fromProdotti.ProdottiReducer
};

export const getAuthState = createFeatureSelector<authState.default>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getAuthUID = createSelector(getAuthState, fromAuth.getAuthUID);
export const getAuthChaletUID = createSelector(getAuthState, fromAuth.getAuthChaletUID);
