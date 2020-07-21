import { Prodotto } from '../prodotto.model';
import { Categoria } from '../../categorie/categoria.model';

export default class CategoriaState {
  prodotto: Prodotto[];
  prodottiCategorie: Categoria[];
  prodottiCount: number;
  loading: boolean;
  deleteLoading: boolean;
  prodottiCategorieLoading: boolean;
  prodottoExist: Prodotto[];
  error: any | null;
}

export const initializeState = (): CategoriaState => {
  return {
    prodotto: [],
    prodottoExist: [],
    prodottiCategorie: [],
    prodottiCount: 0,
    loading: true,
    deleteLoading: false,
    prodottiCategorieLoading: true,
    error: null
   };
};
