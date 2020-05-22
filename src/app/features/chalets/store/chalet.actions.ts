import { Action } from '@ngrx/store';
import { Chalet } from '../chalet.model';

export const SET_CHALETS = '[Chalets] Set_chalets';


export const UPDATE_CHALET = '[Chalets] Update_chalet';
export const UPDATE_CHALET_SUCCESS = '[Chalets] Update_chalet_success';
export const UPDATE_CHALET_FAIL = '[Chalets] Update_chalet_fail';
export const FETCH_CHALETS = '[Chalets] Fetch_chalets';

export class SetChalets implements Action {
  readonly type = SET_CHALETS;
  constructor(public payload: Chalet[]) {}
}


export class UpdateChalet implements Action {
  readonly type = UPDATE_CHALET;
  constructor(public payload: Chalet) {}
}

export class UpdateChaletSuccess implements Action {
  readonly type = UPDATE_CHALET_SUCCESS;
  constructor() { }
}

export class UpdateChaletFail implements Action {
  readonly type = UPDATE_CHALET_FAIL;
  constructor(public payload: string) {}
}

export class FetchChalets implements Action {
  readonly type = FETCH_CHALETS;
  constructor() {}
}



export type ChaletActions = SetChalets
  | UpdateChalet
  | UpdateChaletSuccess
  | UpdateChaletFail
  | FetchChalets;
