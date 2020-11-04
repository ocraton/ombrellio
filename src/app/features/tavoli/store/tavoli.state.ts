import { Tavolo } from '../tavolo.model';

export default class TavoliState {
  tavoli: Tavolo[];
  tavoliCount: number;
  loading: boolean;
  deleteLoading: boolean;
  error: any | null
}

export const initializeState = (): TavoliState => {
  return {
      tavoli: [],
      tavoliCount: 0,
      loading: true,
      deleteLoading: false,
      error: null
   };
};
