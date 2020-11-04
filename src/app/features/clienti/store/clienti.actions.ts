import { createAction, props } from '@ngrx/store';
import { Cliente } from '../cliente.model';

export const SetClienti = createAction(
  '[Clienti] Set_clienti',
  props<{payload: Cliente[]}>()
);

export const UpdateClienti = createAction(
  '[Clienti] Update_clienti',
  props<{payload: Cliente}>()
);

export const UpdateClientiSuccess = createAction(
  '[Clienti] Update_clienti_success'
);

export const UpdateClientiFail = createAction(
  '[Clienti] Update_clienti_fail',
  props<{payload: string}>()
);
export const CreateCliente = createAction(
  '[Clienti] Create_cliente',
  props<{ payload: { cliente: Cliente }}>()
);

export const CreateClienteSuccess = createAction(
  '[Clienti] Create_cliente_success'
);

export const CreateClienteFail = createAction(
  '[Clienti] Create_cliente_fail',
  props<{ payload: string }>()
);
export const DeleteCliente = createAction(
  '[Clienti] Delete_cliente',
  props<{ payload: Cliente }>()
);
export const DeleteClienteSuccess = createAction(
  '[Clienti] Delete_cliente_success',
  props<{ payload: string }>()
);
export const DeleteClienteFail = createAction(
  '[Clienti] Delete_cliente_fail',
  props<{ payload: string }>()
);
export const FetchClienti = createAction('[Clienti] Fetch_clienti');

