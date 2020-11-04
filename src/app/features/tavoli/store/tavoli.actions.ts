import { createAction, props } from '@ngrx/store';
import { Tavolo } from '../tavolo.model';

export const SetTavoli = createAction(
  '[Tavoli] Set_tavoli',
  props<{payload: Tavolo[]}>()
);

export const UpdateTavoli = createAction(
  '[Tavoli] Update_tavoli',
  props<{payload: Tavolo}>()
);

export const UpdateTavoliSuccess = createAction(
  '[Tavoli] Update_tavoli_success'
);

export const UpdateTavoliFail = createAction(
  '[Tavoli] Update_tavoli_fail',
  props<{payload: string}>()
);
export const CreateTavolo = createAction(
  '[Tavoli] Create_tavolo',
  props<{ payload: { tavolo: Tavolo }}>()
);

export const CreateTavoloSuccess = createAction(
  '[Tavoli] Create_tavolo_success'
);

export const CreateTavoloFail = createAction(
  '[Tavoli] Create_tavolo_fail',
  props<{ payload: string }>()
);
export const DeleteTavolo = createAction(
  '[Tavoli] Delete_tavolo',
  props<{ payload: Tavolo }>()
);
export const DeleteTavoloSuccess = createAction(
  '[Tavoli] Delete_tavolo_success',
  props<{ payload: string }>()
);
export const DeleteTavoloFail = createAction(
  '[Tavoli] Delete_tavolo_fail',
  props<{ payload: string }>()
);
export const FetchTavoli = createAction('[Tavoli] Fetch_tavoli');

