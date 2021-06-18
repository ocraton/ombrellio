import { createReducer, on, Action } from '@ngrx/store';
import { Prenotazione } from '../prenotazione.model';
import * as PrenotazioniActions from './prenotazioni.actions';

import PrenotazioniState, { initializeState } from './prenotazioni.state';

const initialState = initializeState();

const reducer = createReducer(

  initialState,

  on(PrenotazioniActions.FetchPrenotazioni, (state: PrenotazioniState) => ({
      ...state,
      loading: true
  })),

  on(PrenotazioniActions.SetPrenotazioni, (state: PrenotazioniState, {payload}) => ({
    ...state,
    prenotazione: payload,
    loading: false
  })),

  on(PrenotazioniActions.SetCountPrenotazioni, (state: PrenotazioniState, {payload}) => ({
    ...state,
    prenotazioniCount: payload,
    loading: false
  })),

  on(PrenotazioniActions.FetchPrenotazione, (state: PrenotazioniState) => ({
      ...state,
      loading: true
  })),

  on(PrenotazioniActions.FetchPrenotazioniOmbrelloni, (state: PrenotazioniState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(PrenotazioniActions.SetPrenotazioniOmbrelloni, (state: PrenotazioniState, { payload }) => {
    return {
      ...state,
      ombrellone: payload,
      loading: false
    };
  }),

  on(PrenotazioniActions.FetchPrenotazioniMappa, (state: PrenotazioniState) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(PrenotazioniActions.SetPrenotazioniMappa, (state: PrenotazioniState, { payload }) => {
    return {
      ...state,
      mappa: payload[0],
      loading: false
    };
  }),

  on(PrenotazioniActions.SetPrenotazione, (state: PrenotazioniState, {payload}) => ({
    ...state,
    prenotazione: payload[0],
    loading: false
  })),

  on(PrenotazioniActions.FetchCountPrenotazioni, (state: PrenotazioniState) => ({
      ...state,
      loading: true
  })),

  on(PrenotazioniActions.UpdatePrenotazione, (state: PrenotazioniState) => ({
      ...state
  })),

  on(PrenotazioniActions.UpdatePrenotazioneSuccess, (state: PrenotazioniState) => ({
      ...state,
      error: null
  })),

  on(PrenotazioniActions.UpdatePrenotazioneFail, (state: PrenotazioniState, {payload}) => ({
      ...state,
      error: payload
  })),

  on(PrenotazioniActions.FilterPrenotazioni, (state: PrenotazioniState, { numOmbrellone }) => ({
      ...state,
      prenotazione: state.prenotazione.filter(function (item) {
        return item.numero_ombrellone == numOmbrellone
      }),
      loading: false,
  })),

  on(PrenotazioniActions.FetchPrenotazioniClienti, (state: PrenotazioniState) => ({
    ...state,
    loadingClienti: true
  })),

  on(PrenotazioniActions.SetPrenotazioniClienti, (state: PrenotazioniState, { payload }) => ({
    ...state,
    clienti: payload,
    loadingClienti: false
  })),

  on(PrenotazioniActions.CreatePrenotazione, (state: PrenotazioniState) => ({
    ...state,
    loading: false
  })),

  on(PrenotazioniActions.CreatePrenotazioneSuccess, (state: PrenotazioniState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(PrenotazioniActions.CreatePrenotazioneFail, (state: PrenotazioniState, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(PrenotazioniActions.CreatePrenotazioniCliente, (state: PrenotazioniState) => ({
    ...state,
    loading: false,
    loadingClienti: false
  })),

  on(PrenotazioniActions.CreatePrenotazioniClienteSuccess, (state: PrenotazioniState) => {
    return {
      ...state,
      loading: false,
      error: null
    };
  }),

  on(PrenotazioniActions.CreatePrenotazioniClienteFail, (state: PrenotazioniState, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  }),

  on(PrenotazioniActions.DeletePrenotazione, (state: PrenotazioniState) => ({
    ...state,
    deleteLoading: true
  })),

  on(PrenotazioniActions.DeletePrenotazioneSuccess, (state: PrenotazioniState, { payload }) => ({
    ...state,
    deleteLoading: false,
    error: null,
  })),

  on(PrenotazioniActions.DeletePrenotazioneFail, (state: PrenotazioniState, { payload }) => ({
    ...state,
    deleteLoading: false,
    error: payload
  })),

)

export function PrenotazioniReducer(
  state: PrenotazioniState | undefined,
  action: Action
): PrenotazioniState {
  return reducer(state, action);
}
