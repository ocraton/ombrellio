import { createAction, props } from '@ngrx/store';
import { Categoria } from '../categoria.model';


export const SetCategorie = createAction(
  '[Categorie] Set_categorie',
  props<{ payload: Categoria[] }>()
);
export const UpdateCategoria = createAction(
  '[Categorie] Update_categoria',
  props<{ payload: Categoria }>()
);
export const UpdateCategoriaSuccess = createAction(
  '[Categorie] Update_categoria_success'
);
export const UpdateCategoriaFail = createAction(
  '[Categorie] Update_categoria_fail',
  props<{ payload: string }>()
);
export const UpdateCategorie = createAction(
  '[Categorie] Update_categorie',
  props<{ payload: Categoria[] }>()
);
export const UpdateCategorieSuccess = createAction(
  '[Categorie] Update_categorie_success'
);
export const UpdateCategorieFail = createAction(
  '[Categorie] Update_categoria_fail',
  props<{ payload: string }>()
);
export const CreateCategoria = createAction(
  '[Categorie] Create_categoria',
  props<{ payload: Categoria }>()
);
export const CreateCategoriaSuccess = createAction(
  '[Categorie] Create_categorie_success'
);
export const CreateCategoriaFail = createAction(
  '[Categorie] Create_categoria_fail',
  props<{ payload: string }>()
);
export const FetchCategorie = createAction(
  '[Categorie] Fetch_categorie'
);
export const FetchCategoriaProdotti = createAction(
  '[Categorie] Fetch_categoriaProdotti',
  props<{ payload: Categoria }>()
);
export const FetchCategoriaProdottiSuccess = createAction(
  '[Categorie] Fetch_categoriaProdotti_success',
  props<{ payload: boolean }>()
);
export const DeleteCategoria = createAction(
  '[Categorie] Delete_categoria',
  props<{ payload: Categoria }>()
);
export const DeleteCategoriaSuccess = createAction(
  '[Categorie] Delete_categoria_success',
  props<{ payload: string }>()
);
export const DeleteCategoriaFail = createAction(
  '[Categorie] Delete_categoria_fail',
  props<{ payload: string }>()
);

