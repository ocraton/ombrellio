import { Action } from '@ngrx/store';
import { Categoria } from '../categoria.model';

export const SET_CATEGORIE = '[Categorie] Set_categorie';
export const UPDATE_CATEGORIA = '[Categorie] Update_categoria';
export const UPDATE_CATEGORIA_SUCCESS = '[Categorie] Update_categoria_success';
export const UPDATE_CATEGORIA_FAIL = '[Categorie] Update_categoria_fail';
export const UPDATE_CATEGORIE = '[Categorie] Update_categorie';
export const UPDATE_CATEGORIE_SUCCESS = '[Categorie] Update_categorie_success';
export const UPDATE_CATEGORIE_FAIL = '[Categorie] Update_categorie_fail';
export const CREATE_CATEGORIA = '[Categorie] Create_categoria';
export const CREATE_CATEGORIA_SUCCESS = '[Categorie] Create_categoria_success';
export const CREATE_CATEGORIA_FAIL = '[Categorie] Create_categoria_fail';
export const FETCH_CATEGORIE = '[Categorie] Fetch_categorie';

export class SetCategorie implements Action {
  readonly type = SET_CATEGORIE;
  constructor(public payload: Categoria[]) {}
}


export class UpdateCategoria implements Action {
  readonly type = UPDATE_CATEGORIA;
  constructor(public payload: Categoria) {}
}

export class UpdateCategoriaSuccess implements Action {
  readonly type = UPDATE_CATEGORIA_SUCCESS;
  constructor() { }
}

export class UpdateCategoriaFail implements Action {
  readonly type = UPDATE_CATEGORIA_FAIL;
  constructor(public payload: string) {}
}

export class UpdateCategorie implements Action {
  readonly type = UPDATE_CATEGORIE;
  constructor(public payload: Categoria[]) {}
}

export class UpdateCategorieSuccess implements Action {
  readonly type = UPDATE_CATEGORIE_SUCCESS;
  constructor() { }
}

export class UpdateCategorieFail implements Action {
  readonly type = UPDATE_CATEGORIE_FAIL;
  constructor(public payload: string) {}
}

export class CreateCategoria implements Action {
  readonly type = CREATE_CATEGORIA;
  constructor(public payload: Categoria) { }
}

export class CreateCategoriaSuccess implements Action {
  readonly type = CREATE_CATEGORIA_SUCCESS;
  constructor() { }
}

export class CreateCategoriaFail implements Action {
  readonly type = CREATE_CATEGORIA_FAIL;
  constructor(public payload: string) { }
}

export class FetchCategorie implements Action {
  readonly type = FETCH_CATEGORIE;
  constructor() {}
}



export type CategoriaActions = SetCategorie
  | UpdateCategoria
  | UpdateCategoriaSuccess
  | UpdateCategoriaFail
  | UpdateCategorie
  | UpdateCategorieSuccess
  | UpdateCategorieFail
  | CreateCategoria
  | CreateCategoriaSuccess
  | CreateCategoriaFail
  | FetchCategorie;
