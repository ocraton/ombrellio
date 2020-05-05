import { Action } from '@ngrx/store';
import { Ombrellone } from '../ombrelloni.model';

export const SET_OMBRELLONI = '[Ombrelloni] Set_ombrelloni';
export const SET_OMBRELLONE = '[Ombrelloni] Set_ombrelloni';
export const SET_COUNT_OMBRELLONI = '[Ombrelloni] Set_count_ombrelloni';
export const UPDATE_OMBRELLONE = '[Ombrelloni] Update_ombrelloni';
export const UPDATE_OMBRELLONE_SUCCESS = '[Ombrelloni] Update_ombrelloni_success';
export const UPDATE_OMBRELLONE_FAIL = '[Ombrelloni] Update_ombrelloni_fail';
export const CREATE_OMBRELLONE = '[Ombrelloni] Create_ombrelloni';
export const CREATE_OMBRELLONE_SUCCESS = '[Ombrelloni] Create_ombrelloni_success';
export const CREATE_OMBRELLONE_FAIL = '[Ombrelloni] Create_ombrelloni_fail';
export const FETCH_OMBRELLONI = '[Ombrelloni] Fetch_ombrelloni';
export const FETCH_OMBRELLONE = '[Ombrelloni] Fetch_ombrellone';
export const FETCH_COUNT_OMBRELLONI = '[Ombrelloni] Fetch_count_ombrelloni';
export const DELETE_OMBRELLONE = "[Ombrelloni] Delete_ombrelloni";
export const DELETE_OMBRELLONE_SUCCESS = "[Ombrelloni] Delete_ombrelloni_success";
export const DELETE_OMBRELLONE_FAIL = "[Ombrelloni] Delete_ombrelloni_fail";


export class SetOmbrelloni implements Action {
  readonly type = SET_OMBRELLONI;
  constructor(public payload: Ombrellone[]) {}
}

export class SetOmbrellone implements Action {
  readonly type = SET_OMBRELLONE;
  constructor(public payload: Ombrellone) {}
}

export class SetCountOmbrelloni implements Action {
  readonly type = SET_COUNT_OMBRELLONI;
  constructor(public payload: number) {}
}

export class CreateOmbrellone implements Action {
  readonly type = CREATE_OMBRELLONE;
  constructor(public payload: Ombrellone) {}
}

export class CreateOmbrelloneSuccess implements Action {
  readonly type = CREATE_OMBRELLONE_SUCCESS;
  constructor(public payload: string) {}
}

export class CreateOmbrelloneFail implements Action {
  readonly type = CREATE_OMBRELLONE_FAIL;
  constructor(public payload: string) {}
}

export class UpdateOmbrellone implements Action {
  readonly type = UPDATE_OMBRELLONE;
  constructor(public payload: Ombrellone) {}
}

export class UpdateOmbrelloneSuccess implements Action {
  readonly type = UPDATE_OMBRELLONE_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateOmbrelloneFail implements Action {
  readonly type = UPDATE_OMBRELLONE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteOmbrellone implements Action {
  readonly type = DELETE_OMBRELLONE;
  constructor(public payload: string) {}
}

export class DeleteOmbrelloneSuccess implements Action {
  readonly type = DELETE_OMBRELLONE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteOmbrelloneFail implements Action {
  readonly type = DELETE_OMBRELLONE_FAIL;
  constructor(public payload: string) {}
}

export class FetchOmbrelloni implements Action {
  readonly type = FETCH_OMBRELLONI;
  constructor() {}
}

export class FetchOmbrellone implements Action {
  readonly type = FETCH_OMBRELLONE;
  constructor(public payload: {idOmbrellone: string}) {}
}

export class FetchCountOmbrelloni implements Action {
  readonly type = FETCH_COUNT_OMBRELLONI;
  constructor() {}
}



export type Ombrellonections = SetOmbrelloni
  | SetOmbrellone
  | SetCountOmbrelloni
  | CreateOmbrellone
  | CreateOmbrelloneSuccess
  | CreateOmbrelloneFail
  | UpdateOmbrellone
  | UpdateOmbrelloneSuccess
  | UpdateOmbrelloneFail
  | DeleteOmbrellone
  | DeleteOmbrelloneSuccess
  | DeleteOmbrelloneFail
  | FetchOmbrelloni
  | FetchOmbrellone
  | FetchCountOmbrelloni;
