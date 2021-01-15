import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';

export default class PrenotazioniState {
  prenotazione: Prenotazione[];
  ombrellone: Ombrellone[];
  prenotazioniCount: number;
  loading: boolean;
  error: any | null;
}

export const initializeState = (): PrenotazioniState => {
  return {
    prenotazione: [],
    ombrellone: [],
    prenotazioniCount: 0,
    loading: true,
    error: null
   };
};
