import { Cliente } from '../cliente.model';

export default class ClientiState {
  clienti: Cliente[];
  clientiCount: number;
  loading: boolean;
  deleteLoading: boolean;
  error: any | null
}

export const initializeState = (): ClientiState => {
  return {
      clienti: [],
      clientiCount: 0,
      loading: true,
      deleteLoading: false,
      error: null
   };
};
