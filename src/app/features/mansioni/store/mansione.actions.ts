import { Action } from '@ngrx/store';

import { Mansione } from '../mansione.model';
import { Mansioni } from '../mansioni.model';


export const SET_MANSIONI = 'SET_MANSIONI';
export const SET_MANSIONE = 'SET_MANSIONE';
export const UPDATE_MANSIONE = 'UPDATE_MANSIONE';
export const UPDATE_MANSIONI_SUCCESS = 'UPDATE_MANSIONI_SUCCESS';
export const UPDATE_MANSIONI_FAIL = 'UPDATE_MANSIONI_FAIL';
export const CREATE_MANSIONE = 'CREATE_MANSIONE';
export const CREATE_MANSIONI_SUCCESS = 'CREATE_MANSIONI_SUCCESS';
export const CREATE_MANSIONI_FAIL = 'CREATE_MANSIONI_FAIL';
export const FETCH_MANSIONI = 'FETCH_MANSIONI';
export const FETCH_MANSIONE = 'FETCH_MANSIONE';
export const DELETE_MANSIONE = "DELETE_MANSIONE";
export const DELETE_MANSIONE_SUCCESS = "DELETE_MANSIONE_SUCCESS";
export const DELETE_MANSIONE_FAIL = "DELETE_MANSIONE_FAIL";

export class SetMansioni implements Action {
  readonly type = SET_MANSIONI;
  constructor(public payload: Mansioni) {}
}

export class SetMansione implements Action {
  readonly type = SET_MANSIONE;
  constructor(public payload: Mansione) {}
}


export class CreateMansione implements Action {
  readonly type = CREATE_MANSIONE;
  constructor(public payload: Mansione) {}
}

export class CreateMansioneSuccess implements Action {
  readonly type = CREATE_MANSIONI_SUCCESS;
  constructor(public payload: Mansione) {}
}

export class CreateMansioneFail implements Action {
  readonly type = CREATE_MANSIONI_FAIL;
  constructor(public payload: string) {}
}

export class UpdateMansione implements Action {
  readonly type = UPDATE_MANSIONE;
  constructor(public payload: {index: number, updateMansione: Mansione}) {}
}

export class UpdateMansioneSuccess implements Action {
  readonly type = UPDATE_MANSIONI_SUCCESS;
  constructor(public payload: Mansione) {}
}

export class UpdateMansioneFail implements Action {
  readonly type = UPDATE_MANSIONI_FAIL;
  constructor(public payload: string) {}
}

export class DeleteMansione implements Action {
  readonly type = DELETE_MANSIONE;
  constructor(public payload: number) {}
}

export class DeleteMansioneSuccess implements Action {
  readonly type = DELETE_MANSIONE_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteMansioneFail implements Action {
  readonly type = DELETE_MANSIONE_FAIL;
  constructor(public payload: string) {}
}

export class FetchMansioni implements Action {
  readonly type = FETCH_MANSIONI;
  constructor(public payload: {search: string, page: string}) {}
}

export class FetchMansione implements Action {
  readonly type = FETCH_MANSIONE;
  constructor(public payload: {id_mansione: number}) {}
}

export type MansioneActions = SetMansioni
  | SetMansione
  | CreateMansione
  | CreateMansioneSuccess
  | CreateMansioneFail
  | UpdateMansione
  | UpdateMansioneSuccess
  | UpdateMansioneFail
  | DeleteMansione
  | DeleteMansioneSuccess
  | DeleteMansioneFail  
  | FetchMansioni
  | FetchMansione;
