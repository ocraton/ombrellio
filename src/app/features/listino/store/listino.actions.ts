import { createAction, props } from '@ngrx/store';
import { Listino } from '../listino.model';


export const FetchListino = createAction(
  '[Listino] Fetch_Listino',
);

export const SetListino = createAction(
  '[Listino] Set_Listino',
  props<{ payload: Listino[] }>()
);






