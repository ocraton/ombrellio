import { Action } from '@ngrx/store';
import { Ordine } from '../ordini.model';

export const SET_ORDINI = '[Ordini] Set_ordini';
export const SET_ORDINE = '[Ordini] Set_ordini';
export const SET_COUNT_ORDINI = '[Ordini] Set_count_ordini';
export const FETCH_ORDINI = '[Ordini] Fetch_ordini';
export const FETCH_ORDINE = '[Ordini] Fetch_ordine';
export const FETCH_COUNT_ORDINI = '[Ordini] Fetch_count_ordini';
export const UPDATE_ORDINE = '[Ordini] Update_ordini';
export const UPDATE_ORDINE_SUCCESS = '[Ordini] Update_ordini_success';
export const UPDATE_ORDINE_FAIL = '[Ordini] Update_ordini_fail';

export class SetOrdini implements Action {
  readonly type = SET_ORDINI;
  constructor(public payload: Ordine[]) {}
}

export class SetOrdine implements Action {
  readonly type = SET_ORDINE;
  constructor(public payload: Ordine) {}
}

export class SetCountOrdini implements Action {
  readonly type = SET_COUNT_ORDINI;
  constructor(public payload: number) {}
}

export class FetchOrdini implements Action {
  readonly type = FETCH_ORDINI;
  constructor(public payload: { orderType: string}) {}
}

export class FetchOrdine implements Action {
  readonly type = FETCH_ORDINE;
  constructor(public payload: {idOrdine: string}) {}
}

export class FetchCountOrdini implements Action {
  readonly type = FETCH_COUNT_ORDINI;
  constructor() {}
}

export class UpdateOrdine implements Action {
  readonly type = UPDATE_ORDINE;
  constructor(public payload: Ordine) { }
}

export class UpdateOrdineSuccess implements Action {
  readonly type = UPDATE_ORDINE_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateOrdineFail implements Action {
  readonly type = UPDATE_ORDINE_FAIL;
  constructor(public payload: string) { }
}


export type Ordinections = SetOrdini
  | SetOrdine
  | SetCountOrdini
  | FetchOrdini
  | FetchOrdine
  | FetchCountOrdini
  | UpdateOrdine
  | UpdateOrdineSuccess
  | UpdateOrdineFail;
