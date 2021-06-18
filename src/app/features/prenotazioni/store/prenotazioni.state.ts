import { Mappa } from './../mappa.model';
import { Cliente } from '../../clienti/cliente.model';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';

export default class PrenotazioniState {
  prenotazione: Prenotazione[];
  ombrellone: Ombrellone[];
  clienti: Cliente[];
  mappa: Mappa;
  prenotazioniCount: number;
  loading: boolean;
  loadingClienti: boolean;
  deleteLoading: boolean;
  error: any | null;
}

export const initializeState = (): PrenotazioniState => {
  return {
    prenotazione: [],
    ombrellone: [],
    clienti: [],
    mappa: {numero_colonne: 0, numero_righe: 0},
    prenotazioniCount: 0,
    loading: true,
    loadingClienti: true,
    deleteLoading: false,
    error: null
   };
};
