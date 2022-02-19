import { createAction, props } from '@ngrx/store';
import { Listino } from '../listino.model';


export const FetchListino = createAction(
  '[Listino] Fetch_Listino',
);

export const SetListino = createAction(
  '[Listino] Set_Listino',
  props<{ payload: Listino[] }>()
);

export const UpdateListino = createAction(
  '[Listino] Update_listino',
  props<{ idListinoMese: String, numeroMese: number, valori: any[] }>()
);

export const UpdateListinoSuccess = createAction(
  '[Listino] Update_listino_success'
);

export const UpdateListinoFail = createAction(
  '[Listino] Update_listino_fail',
  props<{ payload: string }>()
);

export const CreateListino = createAction(
  '[Listino] Create_listino',
  props<{ numeroMese: number, valori: any[] }>()
);

export const CreateListinoSuccess = createAction(
  '[Listino] Create_listino_success'
);

export const CreateListinoFail = createAction(
  '[Listino] Create_listino_fail',
  props<{ payload: string }>()
);





