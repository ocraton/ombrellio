import { Action } from '@ngrx/store';
import { Chalet } from '../chalet.model';

export const SET_CHALETS = '[Chalets] Set_chalets';
export const SET_CHALET = '[Chalets] Set_chalets';
export const SET_COUNT_CHALETS = '[Chalets] Set_count_chalets';
export const UPDATE_CHALET = '[Chalets] Update_chalets';
export const UPDATE_CHALET_SUCCESS = '[Chalets] Update_chalets_success';
export const UPDATE_CHALET_FAIL = '[Chalets] Update_chalets_fail';
export const CREATE_CHALET = '[Chalets] Create_chalets';
export const CREATE_CHALET_SUCCESS = '[Chalets] Create_chalets_success';
export const CREATE_CHALET_FAIL = '[Chalets] Create_chalets_fail';
export const FETCH_CHALETS = '[Chalets] Fetch_chalets';
export const FETCH_CHALET = '[Chalets] Fetch_chalet';
export const FETCH_COUNT_CHALETS = '[Chalets] Fetch_count_chalets';
export const DELETE_CHALET = "[Chalets] Delete_chalets";
export const DELETE_CHALET_SUCCESS = "[Chalets] Delete_chalets_success";
export const DELETE_CHALET_FAIL = "[Chalets] Delete_chalets_fail";


export class SetChalets implements Action {
  readonly type = SET_CHALETS;
  constructor(public payload: Chalet[]) {}
}

export class SetChalet implements Action {
  readonly type = SET_CHALET;
  constructor(public payload: Chalet) {}
}

export class SetCountChalets implements Action {
  readonly type = SET_COUNT_CHALETS;
  constructor(public payload: number) {}
}

export class CreateChalet implements Action {
  readonly type = CREATE_CHALET;
  constructor(public payload: Chalet) {}
}

export class CreateChaletSuccess implements Action {
  readonly type = CREATE_CHALET_SUCCESS;
  constructor(public payload: string) {}
}

export class CreateChaletFail implements Action {
  readonly type = CREATE_CHALET_FAIL;
  constructor(public payload: string) {}
}

export class UpdateChalet implements Action {
  readonly type = UPDATE_CHALET;
  constructor(public payload: Chalet) {}
}

export class UpdateChaletSuccess implements Action {
  readonly type = UPDATE_CHALET_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateChaletFail implements Action {
  readonly type = UPDATE_CHALET_FAIL;
  constructor(public payload: string) {}
}

export class DeleteChalet implements Action {
  readonly type = DELETE_CHALET;
  constructor(public payload: string) {}
}

export class DeleteChaletSuccess implements Action {
  readonly type = DELETE_CHALET_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteChaletFail implements Action {
  readonly type = DELETE_CHALET_FAIL;
  constructor(public payload: string) {}
}

export class FetchChalets implements Action {
  readonly type = FETCH_CHALETS;
  constructor() {}
}

export class FetchChalet implements Action {
  readonly type = FETCH_CHALET;
  constructor(public payload: {idChalet: string}) {}
}

export class FetchCountChalets implements Action {
  readonly type = FETCH_COUNT_CHALETS;
  constructor() {}
}



export type ChaletActions = SetChalets
  | SetChalet
  | SetCountChalets
  | CreateChalet
  | CreateChaletSuccess
  | CreateChaletFail
  | UpdateChalet
  | UpdateChaletSuccess
  | UpdateChaletFail
  | DeleteChalet
  | DeleteChaletSuccess
  | DeleteChaletFail
  | FetchChalets
  | FetchChalet
  | FetchCountChalets;
