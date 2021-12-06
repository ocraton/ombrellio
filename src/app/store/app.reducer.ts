import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromAuth from '../features/login/store/auth.reducer';
import * as authState from '../features/login/store/auth.state';

import * as fromChalet from '../features/chalet/store/chalet.reducer';
import * as chaletState from '../features/chalet/store/chalet.state';

import * as fromClienti from '../features/clienti/store/clienti.reducer';
import * as clientiState from '../features/clienti/store/clienti.state';

import * as fromTavoli from '../features/tavoli/store/tavoli.reducer';
import * as tavoliState from '../features/tavoli/store/tavoli.state';

import * as fromOmbrelloni from '../features/ombrelloni/store/ombrelloni.reducer';
import * as ombrelloniState from '../features/ombrelloni/store/ombrelloni.state';

import * as fromOrdini from '../features/ordini/store/ordini.reducer';
import * as ordiniState from '../features/ordini/store/ordini.state';

import * as fromPrenotazioni from '../features/prenotazioni/store/prenotazioni.reducer';
import * as prenotazioniState from '../features/prenotazioni/store/prenotazioni.state';

import * as fromCategorie from '../features/categorie/store/categorie.reducer';
import * as categorieState from '../features/categorie/store/categorie.state';

import * as fromAttrezzature from '../features/attrezzature/store/attrezzature.reducer';
import * as attrezzatureState from '../features/attrezzature/store/attrezzature.state';

import * as fromProdotti from '../features/prodotti/store/prodotti.reducer';
import * as prodottiState from '../features/prodotti/store/prodotti.state';

import * as fromUtenti from '../features/utenti/store/utenti.reducer';
import * as utentiState from '../features/utenti/store/utenti.state';

export interface AppState {
  auth: authState.default;
  chalet: chaletState.default;
  clienti: clientiState.default;
  tavoli: tavoliState.default;
  ombrelloni: ombrelloniState.default;
  ordini: ordiniState.default;
  prenotazioni: prenotazioniState.default;
  categorie: categorieState.default;
  attrezzature: attrezzatureState.default;
  prodotti: prodottiState.default;
  utenti: utentiState.default;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  chalet: fromChalet.ChaletReducer,
  clienti: fromClienti.ClientiReducer,
  tavoli: fromTavoli.TavoliReducer,
  ombrelloni: fromOmbrelloni.OmbrelloniReducer,
  ordini: fromOrdini.OrdiniReducer,
  prenotazioni: fromPrenotazioni.PrenotazioniReducer,
  categorie: fromCategorie.CategorieReducer,
  attrezzature: fromAttrezzature.AttrezzatureReducer,
  prodotti: fromProdotti.ProdottiReducer,
  utenti: fromUtenti.UtentiReducer,
};

export const getAuthState = createFeatureSelector<authState.default>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getAuthUID = createSelector(getAuthState, fromAuth.getAuthUID);
export const getAuthChaletUID = createSelector(getAuthState, fromAuth.getAuthChaletUID);
