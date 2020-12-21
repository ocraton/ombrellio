import { createAction, props } from '@ngrx/store';
import { Utente } from './../utente.model';

export const CreateUtente = createAction(
  '[Utenti] Create_utente',
  props<{ payload: { utente: Utente } }>()
);

export const CreateUtenteSuccess = createAction(
  '[Utenti] Create_utente_success'
);

export const CreateUtenteFail = createAction(
  '[Utenti] Create_utente_fail',
  props<{ payload: string }>()
);
