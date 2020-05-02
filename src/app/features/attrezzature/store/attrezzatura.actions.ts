import { Action } from '@ngrx/store';

import { Attrezzatura } from '../attrezzatura.model';
import { Attrezzature } from '../attrezzature.model';


export const SET_ATTREZZATURE = 'SET_ATTREZZATURE';
export const UPDATE_ATTREZZATURA = 'UPDATE_ATTREZZATURA';
export const UPDATE_ATTREZZATURE_SUCCESS = 'UPDATE_ATTREZZATURE_SUCCESS';
export const UPDATE_ATTREZZATURE_FAIL = 'UPDATE_ATTREZZATURE_FAIL';
export const CREATE_ATTREZZATURA = 'CREATE_ATTREZZATURA';
export const CREATE_ATTREZZATURE_SUCCESS = 'CREATE_ATTREZZATURE_SUCCESS';
export const CREATE_ATTREZZATURE_FAIL = 'CREATE_ATTREZZATURE_FAIL';
export const FETCH_ATTREZZATURE = 'FETCH_ATTREZZATURE';
export const DELETE_ATTREZZATURA = "DELETE_ATTREZZATURA";
export const DELETE_ATTREZZATURA_SUCCESS = "DELETE_ATTREZZATURA_SUCCESS";
export const DELETE_ATTREZZATURA_FAIL = "DELETE_ATTREZZATURA_FAIL";

export class SetAttrezzature implements Action {
  readonly type = SET_ATTREZZATURE;
  constructor(public payload: Attrezzature) {}
}

export class CreateAttrezzatura implements Action {
  readonly type = CREATE_ATTREZZATURA;
  constructor(public payload: Attrezzatura) {}
}

export class CreateAttrezzaturaSuccess implements Action {
  readonly type = CREATE_ATTREZZATURE_SUCCESS;
  constructor(public payload: Attrezzatura) {}
}

export class CreateAttrezzaturaFail implements Action {
  readonly type = CREATE_ATTREZZATURE_FAIL;
  constructor(public payload: string) {}
}

export class UpdateAttrezzatura implements Action {
  readonly type = UPDATE_ATTREZZATURA;
  constructor(public payload: {index: number, updateAttrezzatura: Attrezzatura}) {}
}

export class UpdateAttrezzaturaSuccess implements Action {
  readonly type = UPDATE_ATTREZZATURE_SUCCESS;
  constructor(public payload: Attrezzatura) {}
}

export class UpdateAttrezzaturaFail implements Action {
  readonly type = UPDATE_ATTREZZATURE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteAttrezzatura implements Action {
  readonly type = DELETE_ATTREZZATURA;
  constructor(public payload: number) {}
}

export class DeleteAttrezzaturaSuccess implements Action {
  readonly type = DELETE_ATTREZZATURA_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteAttrezzaturaFail implements Action {
  readonly type = DELETE_ATTREZZATURA_FAIL;
  constructor(public payload: string) {}
}

export class FetchAttrezzature implements Action {
  readonly type = FETCH_ATTREZZATURE;
  constructor(public payload: {search: string, page: string}) {}
}

export type AttrezzaturaActions = SetAttrezzature
  | CreateAttrezzatura
  | CreateAttrezzaturaSuccess
  | CreateAttrezzaturaFail
  | UpdateAttrezzatura
  | UpdateAttrezzaturaSuccess
  | UpdateAttrezzaturaFail
  | DeleteAttrezzatura
  | DeleteAttrezzaturaSuccess
  | DeleteAttrezzaturaFail  
  | FetchAttrezzature;
