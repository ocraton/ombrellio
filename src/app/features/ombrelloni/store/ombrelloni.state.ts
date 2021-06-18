import { Mappa } from '../../prenotazioni/mappa.model';
import { Ombrellone } from '../ombrellone.model';

export default class OmbrelloniState {
  ombrelloni: Ombrellone[];
  mappa: Mappa;
  ombrelloniCount: number;
  loading: boolean;
  deleteLoading: boolean;
  error: any | null
}

export const initializeState = (): OmbrelloniState => {
  return {
      ombrelloni: [],
      mappa: {numero_colonne: 0, numero_righe: 0},
      ombrelloniCount: 0,
      loading: true,
      deleteLoading: false,
      error: null
   };
};
