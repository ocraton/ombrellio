import { Attrezzatura } from './../../attrezzature/attrezzatura.model';
import { Mappa } from './../mappa.model';
import { Cliente } from '../../clienti/cliente.model';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';
import { Listino } from '../../listino/listino.model';

export default class PrenotazioniState {
  prenotazione: Prenotazione[];
  ombrellone: Ombrellone[];
  clienti: Cliente[];
  listino: Listino[];
  dataInizio: Date;
  dataFine: Date;
  attrezzature: Attrezzatura[];
  mappa: Mappa;
  prenotazioniCount: number;
  loading: boolean;
  loadingClienti: boolean;
  loadingAttrezzature: boolean;
  loadedOmbrelloni: boolean;
  deleteLoading: boolean;
  error: any | null;
}

export const initializeState = (): PrenotazioniState => {
  return {
    prenotazione: [],
    ombrellone: [],
    clienti: [],
    listino: [],
    dataInizio: new Date(),
    dataFine: new Date(),
    attrezzature: [],
    mappa: {numero_colonne: 0, numero_righe: 0},
    prenotazioniCount: 0,
    loading: true,
    loadingClienti: true,
    loadingAttrezzature: true,
    loadedOmbrelloni: true,
    deleteLoading: false,
    error: null
   };
};
