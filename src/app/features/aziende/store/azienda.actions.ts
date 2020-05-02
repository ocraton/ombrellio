import { Action } from '@ngrx/store';

import { Azienda } from '../azienda.model';


export const SET_AZIENDE = '[Aziende] Set_aziende';
export const SET_AZIENDA = '[Aziende] Set_azienda';
export const SET_COUNT_AZIENDE = '[Aziende] Set_count_aziende';
export const UPDATE_AZIENDA = '[Aziende] Update_azienda';
export const UPDATE_AZIENDE_SUCCESS = '[Aziende] Update_aziende_success';
export const UPDATE_AZIENDE_FAIL = '[Aziende] Update_aziende_fail';
export const CREATE_AZIENDA = '[Aziende] Create_azienda';
export const CREATE_AZIENDA_SUCCESS = '[Aziende] Create_aziende_success';
export const CREATE_AZIENDA_FAIL = '[Aziende] Create_aziende_fail';
export const FETCH_AZIENDE = '[Aziende] Fetch_aziende';
export const FETCH_AZIENDA = '[Aziende] Fetch_azienda';
export const FETCH_COUNT_AZIENDE = '[Aziende] Fetch_count_aziende';
export const DELETE_AZIENDA = "[Aziende] Delete_azienda";
export const DELETE_AZIENDA_SUCCESS = "[Aziende] Delete_azienda_success";
export const DELETE_AZIENDA_FAIL = "[Aziende] Delete_azienda_fail";


export class SetAziende implements Action {
  readonly type = SET_AZIENDE;
  constructor(public payload: Azienda[]) {}
}

export class SetAzienda implements Action {
  readonly type = SET_AZIENDA;
  constructor(public payload: Azienda) {}
}

export class SetCountAziende implements Action {
  readonly type = SET_COUNT_AZIENDE;
  constructor(public payload: number) {}
}

export class CreateAzienda implements Action {
  readonly type = CREATE_AZIENDA;
  constructor(public payload: Azienda) {}
}

export class CreateAziendaSuccess implements Action {
  readonly type = CREATE_AZIENDA_SUCCESS;
  constructor(public payload: string) {}
}

export class CreateAziendaFail implements Action {
  readonly type = CREATE_AZIENDA_FAIL;
  constructor(public payload: string) {}
}

export class UpdateAzienda implements Action {
  readonly type = UPDATE_AZIENDA;
  constructor(public payload: {index: number, updateAzienda: Azienda}) {}
}

export class UpdateAziendaSuccess implements Action {
  readonly type = UPDATE_AZIENDE_SUCCESS;
  constructor(public payload: Azienda) {}
}

export class UpdateAziendaFail implements Action {
  readonly type = UPDATE_AZIENDE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteAzienda implements Action {
  readonly type = DELETE_AZIENDA;
  constructor(public payload: string) {}
}

export class DeleteAziendaSuccess implements Action {
  readonly type = DELETE_AZIENDA_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteAziendaFail implements Action {
  readonly type = DELETE_AZIENDA_FAIL;
  constructor(public payload: string) {}
}

export class FetchAziende implements Action {
  readonly type = FETCH_AZIENDE;
  constructor(public payload) {}
}

export class FetchAzienda implements Action {
  readonly type = FETCH_AZIENDA;
  constructor(public payload: {idAzienda: string}) {}
}

export class FetchCountAziende implements Action {
  readonly type = FETCH_COUNT_AZIENDE;
  constructor() {}
}



export type Aziendactions = SetAziende
  | SetAzienda
  | SetCountAziende
  | CreateAzienda
  | CreateAziendaSuccess
  | CreateAziendaFail
  | UpdateAzienda
  | UpdateAziendaSuccess
  | UpdateAziendaFail
  | DeleteAzienda
  | DeleteAziendaSuccess
  | DeleteAziendaFail
  | FetchAziende
  | FetchAzienda
  | FetchCountAziende;
