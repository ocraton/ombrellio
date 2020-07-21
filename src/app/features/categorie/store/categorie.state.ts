import { Categoria } from '../categoria.model';

export default class CategoriaState {
  categoria: Categoria[];
  canDelete: boolean;
  canDeleteLoading: boolean;
  loading: boolean;
  error: any | null;
}

export const initializeState = (): CategoriaState => {
  return {
    categoria: [],
    canDelete: false,
    canDeleteLoading: false,
    loading: true,
    error: null
   };
};
