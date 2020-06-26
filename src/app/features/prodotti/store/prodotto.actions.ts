import { Categoria } from './../../categorie/categoria.model';
import { Action } from '@ngrx/store';
import { Prodotto } from '../prodotto.model';

export const FETCH_PRODOTTI_BY_CATEGORIA = '[Prodotti] Fetch_prodotti_by_categoria';
export const SET_PRODOTTI = '[Prodotti] Set_prodotti';
export const SET_PRODOTTI_EXIST = '[Prodotti] Set_prodotti_exist';
export const UPDATE_PRODOTTO = '[Prodotti] Update_prodotto';
export const UPDATE_PRODOTTO_SUCCESS = '[Prodotti] Update_prodotto_success';
export const UPDATE_PRODOTTO_FAIL = '[Prodotti] Update_prodotto_fail';
export const CREATE_PRODOTTO = '[Prodotti] Create_prodotto';
export const CREATE_PRODOTTO_SUCCESS = '[Prodotti] Create_prodotto_success';
export const CREATE_PRODOTTO_FAIL = '[Prodotti] Create_prodotto_fail';
export const FETCH_PRODOTTI_EXIST = '[Prodotti] Fetch_prodotti_exist';
export const FETCH_PRODOTTI_CATEGORIE = '[Prodotti] Fetch_prodotti_categorie';
export const SET_PRODOTTI_CATEGORIE = '[Prodotti] Set_prodotti_categorie';
export const DELETE_PRODOTTO = '[Prodotti] Delete_prodotti';
export const DELETE_PRODOTTO_SUCCESS = '[Prodotti] Delete_prodotti_success';
export const DELETE_PRODOTTO_FAIL = '[Prodotti] Delete_prodotti_fail';


export class FetchProdottiByCategoria implements Action {
  readonly type = FETCH_PRODOTTI_BY_CATEGORIA;
  constructor(public payload: Categoria) { }
}

export class SetProdotti implements Action {
  readonly type = SET_PRODOTTI;
  constructor(public payload: Prodotto[]) {}
}

export class SetProdottiExist implements Action {
  readonly type = SET_PRODOTTI_EXIST;
  constructor(public payload: Prodotto[]) {}
}


export class UpdateProdotto implements Action {
  readonly type = UPDATE_PRODOTTO;
  constructor(public payload: Prodotto) {}
}

export class UpdateProdottoSuccess implements Action {
  readonly type = UPDATE_PRODOTTO_SUCCESS;
  constructor() { }
}

export class UpdateProdottoFail implements Action {
  readonly type = UPDATE_PRODOTTO_FAIL;
  constructor(public payload: string) {}
}

export class CreateProdotto implements Action {
  readonly type = CREATE_PRODOTTO;
  constructor(public payload: Prodotto) { }
}

export class CreateProdottoSuccess implements Action {
  readonly type = CREATE_PRODOTTO_SUCCESS;
  constructor() { }
}

export class CreateProdottoFail implements Action {
  readonly type = CREATE_PRODOTTO_FAIL;
  constructor(public payload: string) { }
}

export class FetchProdottiExist implements Action {
  readonly type = FETCH_PRODOTTI_EXIST;
  constructor() {}
}

export class FetchProdottiCategorie implements Action {
  readonly type = FETCH_PRODOTTI_CATEGORIE;
  constructor() { }
}

export class SetProdottiCategorie implements Action {
  readonly type = SET_PRODOTTI_CATEGORIE;
  constructor(public payload: Categoria[]) { }
}


export class DeleteProdotto implements Action {
  readonly type = DELETE_PRODOTTO;
  constructor(public payload: Prodotto) { }
}

export class DeleteProdottoSuccess implements Action {
  readonly type = DELETE_PRODOTTO_SUCCESS;
  constructor(public payload: string) { }
}

export class DeleteProdottoFail implements Action {
  readonly type = DELETE_PRODOTTO_FAIL;
  constructor(public payload: string) { }
}


export type ProdottoActions = SetProdotti
  | SetProdottiExist
  | UpdateProdotto
  | UpdateProdottoSuccess
  | UpdateProdottoFail
  | CreateProdotto
  | CreateProdottoSuccess
  | CreateProdottoFail
  | FetchProdottiExist
  | FetchProdottiCategorie
  | FetchProdottiByCategoria
  | SetProdottiCategorie
  | DeleteProdotto
  | DeleteProdottoSuccess
  | DeleteProdottoFail;
