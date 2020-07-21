import { createAction, props } from '@ngrx/store';
import { Prodotto } from '../prodotto.model';
import { Categoria } from '../../categorie/categoria.model';


export const SetProdotti = createAction(
  '[Prodotti] Set_prodotti',
  props<{ payload: Prodotto[] }>()
);
export const UpdateProdotto = createAction(
  '[Prodotti] Update_prodotto',
  props< Prodotto >()
);
export const UpdateProdottoSuccess = createAction(
  '[Prodotti] Update_prodotto_success'
);
export const UpdateProdottoFail = createAction(
  '[Prodotti] Update_prodotto_fail',
  props<{ payload: string }>()
);
export const UpdateProdotti = createAction(
  '[Prodotti] Update_prodotti',
  props<{ payload: Prodotto[] }>()
);
export const UpdateProdottiSuccess = createAction(
  '[Prodotti] Update_prodotti_success'
);
export const CreateProdotto = createAction(
  '[Prodotti] Create_prodotto',
  props<{ payload: Prodotto }>()
);
export const CreateProdottoSuccess = createAction(
  '[Prodotti] Create_prodotti_success'
);
export const CreateProdottoFail = createAction(
  '[Prodotti] Create_prodotto_fail',
  props<{ payload: string }>()
);
export const FetchProdotti = createAction(
  '[Prodotti] Fetch_prodotti'
);
export const DeleteProdotto = createAction(
  '[Prodotti] Delete_prodotto',
  props<{ payload: Prodotto }>()
);
export const DeleteProdottoSuccess = createAction(
  '[Prodotti] Delete_prodotto_success',
  props<{ payload: string }>()
);
export const DeleteProdottoFail = createAction(
  '[Prodotti] Delete_prodotto_fail',
  props<{ payload: string }>()
);
export const SetProdottiExist = createAction(
  '[Prodotti] Set_prodotti_exist',
  props<{ payload: Prodotto[] }>()
);
export const FetchProdottiExist = createAction(
  '[Prodotti] Fetch_prodotti_exist'
);
export const FetchProdottiCategorie = createAction(
  '[Prodotti] Fetch_prodotti_categorie'
);
export const FetchProdottiByCategoria = createAction(
  '[Prodotti] Fetch_prodotti_by_categoria',
  props< Categoria >()
);
export const SetProdottiCategorie = createAction(
  '[Prodotti] Set_prodotti_categorie',
  props<{ payload: Categoria[] }>()
);

