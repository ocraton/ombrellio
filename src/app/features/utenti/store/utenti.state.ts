import { Utente } from '../utente.model';

export default class UtentiState {
  utente: Utente;
  loading: boolean;
  error: any | null
}

export const initializeState = (): UtentiState => {
  return {
    utente: null,
    loading: true,
    error: null
  };
};
