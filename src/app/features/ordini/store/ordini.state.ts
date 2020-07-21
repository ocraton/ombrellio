import { Ordine } from '../ordini.model';

export default class OrdiniState {
  ordine: Ordine[];
  ordiniCount: number;
  loading: boolean;
  error: any | null;
}

export const initializeState = (): OrdiniState => {
  return {
    ordine: [],
    ordiniCount: 0,
    loading: true,
    error: null
   };
};
