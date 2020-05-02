import { Action } from '@ngrx/store';

import { Requisito } from '../requisito.model';
import { Requisiti } from '../requisiti.model';


export const SET_REQUISITI = 'SET_REQUISITI';
export const UPDATE_REQUISITO = 'UPDATE_REQUISITO';
export const UPDATE_REQUISITI_SUCCESS = 'UPDATE_REQUISITI_SUCCESS';
export const UPDATE_REQUISITI_FAIL = 'UPDATE_REQUISITI_FAIL';
export const CREATE_REQUISITO = 'CREATE_REQUISITO';
export const CREATE_REQUISITI_SUCCESS = 'CREATE_REQUISITI_SUCCESS';
export const CREATE_REQUISITI_FAIL = 'CREATE_REQUISITI_FAIL';
export const FETCH_REQUISITI = 'FETCH_REQUISITI';
export const DELETE_REQUISITO = "DELETE_REQUISITO";
export const DELETE_REQUISITO_SUCCESS = "DELETE_REQUISITO_SUCCESS";
export const DELETE_REQUISITO_FAIL = "DELETE_REQUISITO_FAIL";

export class SetRequisiti implements Action {
  readonly type = SET_REQUISITI;
  constructor(public payload: Requisiti) {}
}

export class CreateRequisito implements Action {
  readonly type = CREATE_REQUISITO;
  constructor(public payload: Requisito) {}
}

export class CreateRequisitoSuccess implements Action {
  readonly type = CREATE_REQUISITI_SUCCESS;
  constructor(public payload: Requisito) {}
}

export class CreateRequisitoFail implements Action {
  readonly type = CREATE_REQUISITI_FAIL;
  constructor(public payload: string) {}
}

export class UpdateRequisito implements Action {
  readonly type = UPDATE_REQUISITO;
  constructor(public payload: {index: number, updateRequisito: Requisito}) {}
}

export class UpdateRequisitoSuccess implements Action {
  readonly type = UPDATE_REQUISITI_SUCCESS;
  constructor(public payload: Requisito) {}
}

export class UpdateRequisitoFail implements Action {
  readonly type = UPDATE_REQUISITI_FAIL;
  constructor(public payload: string) {}
}

export class DeleteRequisito implements Action {
  readonly type = DELETE_REQUISITO;
  constructor(public payload: number) {}
}

export class DeleteRequisitoSuccess implements Action {
  readonly type = DELETE_REQUISITO_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteRequisitoFail implements Action {
  readonly type = DELETE_REQUISITO_FAIL;
  constructor(public payload: string) {}
}

export class FetchRequisiti implements Action {
  readonly type = FETCH_REQUISITI;
  constructor(public payload: {search: string, page: string}) {}
}

export type RequisitoActions = SetRequisiti
  | CreateRequisito
  | CreateRequisitoSuccess
  | CreateRequisitoFail
  | UpdateRequisito
  | UpdateRequisitoSuccess
  | UpdateRequisitoFail
  | DeleteRequisito
  | DeleteRequisitoSuccess
  | DeleteRequisitoFail  
  | FetchRequisiti;
