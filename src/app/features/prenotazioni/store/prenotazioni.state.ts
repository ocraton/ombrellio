import { Attrezzatura } from './../../attrezzature/attrezzatura.model';
import { Mappa } from './../mappa.model';
import { Cliente } from '../../clienti/cliente.model';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';

export default class PrenotazioniState {
  prenotazione: Prenotazione[];
  ombrellone: Ombrellone[];
  clienti: Cliente[];
  attrezzature: Attrezzatura[];
  mappa: Mappa;
  prenotazioniCount: number;
  loading: boolean;
  loadingClienti: boolean;
  loadingAttrezzature: boolean;
  deleteLoading: boolean;
  isPagato: boolean;
  error: any | null;
}

export const initializeState = (): PrenotazioniState => {
  return {
    prenotazione: [],
    ombrellone: [],
    clienti: [],
    attrezzature: [],
    mappa: {numero_colonne: 0, numero_righe: 0},
    prenotazioniCount: 0,
    loading: true,
    loadingClienti: true,
    loadingAttrezzature: true,
    deleteLoading: false,
    isPagato: false,
    error: null
   };
};
