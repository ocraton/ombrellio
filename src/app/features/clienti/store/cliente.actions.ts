import { Action } from '@ngrx/store';

import { Cliente } from '../cliente.model';
import { Clienti } from '../clienti.model';


export const SET_CLIENTI = 'SET_CLIENTI';
export const UPDATE_CLIENTE = 'UPDATE_CLIENTE';
export const UPDATE_CLIENTI_SUCCESS = 'UPDATE_CLIENTI_SUCCESS';
export const UPDATE_CLIENTI_FAIL = 'UPDATE_CLIENTI_FAIL';
export const CREATE_CLIENTE = 'CREATE_CLIENTE';
export const CREATE_CLIENTI_SUCCESS = 'CREATE_CLIENTI_SUCCESS';
export const CREATE_CLIENTI_FAIL = 'CREATE_CLIENTI_FAIL';
export const FETCH_CLIENTI = 'FETCH_CLIENTI';
export const DELETE_CLIENTE = "DELETE_CLIENTE";
export const DELETE_CLIENTE_SUCCESS = "DELETE_CLIENTE_SUCCESS";
export const DELETE_CLIENTE_FAIL = "DELETE_CLIENTE_FAIL";

export class SetClienti implements Action {
  readonly type = SET_CLIENTI;
  constructor(public payload: Clienti) {}
}

export class CreateCliente implements Action {
  readonly type = CREATE_CLIENTE;
  constructor(public payload: Cliente) {}
}

export class CreateClienteSuccess implements Action {
  readonly type = CREATE_CLIENTI_SUCCESS;
  constructor(public payload: Cliente) {}
}

export class CreateClienteFail implements Action {
  readonly type = CREATE_CLIENTI_FAIL;
  constructor(public payload: string) {}
}

export class UpdateCliente implements Action {
  readonly type = UPDATE_CLIENTE;
  constructor(public payload: {index: number, updateCliente: Cliente}) {}
}

export class UpdateClienteSuccess implements Action {
  readonly type = UPDATE_CLIENTI_SUCCESS;
  constructor(public payload: Cliente) {}
}

export class UpdateClienteFail implements Action {
  readonly type = UPDATE_CLIENTI_FAIL;
  constructor(public payload: string) {}
}

export class DeleteCliente implements Action {
  readonly type = DELETE_CLIENTE;
  constructor(public payload: number) {}
}

export class DeleteClienteSuccess implements Action {
  readonly type = DELETE_CLIENTE_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteClienteFail implements Action {
  readonly type = DELETE_CLIENTE_FAIL;
  constructor(public payload: string) {}
}

export class FetchClienti implements Action {
  readonly type = FETCH_CLIENTI;
  constructor(public payload: {search: string, page: string}) {}
}

export type ClienteActions = SetClienti
  | CreateCliente
  | CreateClienteSuccess
  | CreateClienteFail
  | UpdateCliente
  | UpdateClienteSuccess
  | UpdateClienteFail
  | DeleteCliente
  | DeleteClienteSuccess
  | DeleteClienteFail  
  | FetchClienti;
