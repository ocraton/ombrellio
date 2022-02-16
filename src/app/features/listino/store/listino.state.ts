import { Listino } from '../listino.model';

export default class ListinoState {
  listino: Listino[];
  loading: boolean;
  error: any | null;
}

export const initializeState = (): ListinoState => {
  return {
    listino: [],
    loading: true,
    error: null
   };
};
