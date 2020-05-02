import { Action } from '@ngrx/store';

import { Risorseumane } from '../risorseumane.model';
import { Risorsaumana } from '../risorsaumana.model';


export const SET_RISORSEUMANE = 'SET_RISORSEUMANE';
export const UPDATE_RISORSAUMANA = 'UPDATE_RISORSAUMANA';
export const UPDATE_RISORSEUMANE_SUCCESS = 'UPDATE_RISORSEUMANE_SUCCESS';
export const UPDATE_RISORSEUMANE_FAIL = 'UPDATE_RISORSEUMANE_FAIL';
export const CREATE_RISORSAUMANA = 'CREATE_RISORSAUMANA';
export const CREATE_RISORSEUMANE_SUCCESS = 'CREATE_RISORSEUMANE_SUCCESS';
export const CREATE_RISORSEUMANE_FAIL = 'CREATE_RISORSEUMANE_FAIL';
export const FETCH_RISORSEUMANE = 'FETCH_RISORSEUMANE';
export const DELETE_RISORSAUMANA = "DELETE_RISORSAUMANA";
export const DELETE_RISORSAUMANA_SUCCESS = "DELETE_RISORSAUMANA_SUCCESS";
export const DELETE_RISORSAUMANA_FAIL = "DELETE_RISORSAUMANA_FAIL";

export class SetRisorseumane implements Action {
  readonly type = SET_RISORSEUMANE;
  constructor(public payload: Risorseumane) {}
}

export class CreateRisorsaumana implements Action {
  readonly type = CREATE_RISORSAUMANA;
  constructor(public payload: Risorsaumana) {}
}

export class CreateRisorsaumanaSuccess implements Action {
  readonly type = CREATE_RISORSEUMANE_SUCCESS;
  constructor(public payload: Risorsaumana) {}
}

export class CreateRisorsaumanaFail implements Action {
  readonly type = CREATE_RISORSEUMANE_FAIL;
  constructor(public payload: string) {}
}

export class UpdateRisorsaumana implements Action {
  readonly type = UPDATE_RISORSAUMANA;
  constructor(public payload: {index: number, updateRisorsaumana: Risorsaumana}) {}
}

export class UpdateRisorsaumanaSuccess implements Action {
  readonly type = UPDATE_RISORSEUMANE_SUCCESS;
  constructor(public payload: Risorsaumana) {}
}

export class UpdateRisorsaumanaFail implements Action {
  readonly type = UPDATE_RISORSEUMANE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteRisorsaumana implements Action {
  readonly type = DELETE_RISORSAUMANA;
  constructor(public payload: number) {}
}

export class DeleteRisorsaumanaSuccess implements Action {
  readonly type = DELETE_RISORSAUMANA_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteRisorsaumanaFail implements Action {
  readonly type = DELETE_RISORSAUMANA_FAIL;
  constructor(public payload: string) {}
}

export class FetchRisorseumane implements Action {
  readonly type = FETCH_RISORSEUMANE;
  constructor(public payload: {search: string, page: string, azienda_id: string}) {}
}

export type RisorsaumanaActions = SetRisorseumane
  | CreateRisorsaumana
  | CreateRisorsaumanaSuccess
  | CreateRisorsaumanaFail
  | UpdateRisorsaumana
  | UpdateRisorsaumanaSuccess
  | UpdateRisorsaumanaFail
  | DeleteRisorsaumana
  | DeleteRisorsaumanaSuccess
  | DeleteRisorsaumanaFail  
  | FetchRisorseumane;
