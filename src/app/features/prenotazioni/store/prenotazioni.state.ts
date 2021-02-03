import { Cliente } from '../../clienti/cliente.model';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';

export default class PrenotazioniState {
  prenotazione: Prenotazione[];
  ombrellone: Ombrellone[];
  clienti: Cliente[];
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
    prenotazioniCount: 0,
    loading: true,
    loadingClienti: true,
    deleteLoading: false,
    error: null
   };
};
