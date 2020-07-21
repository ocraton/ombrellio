import { createAction, props } from '@ngrx/store';
import { Ordine } from '../ordini.model';


export const SetCountOrdini = createAction(
  '[Ordini] Set_Count_Ordini',
  props<{ payload: number }>()
);

export const FetchOrdini = createAction(
  '[Ordini] Fetch_Ordini',
  props<{ orderType: string }>()
);

export const SetOrdini = createAction(
  '[Ordini] Set_Ordini',
  props<{ payload: Ordine[] }>()
);

export const FetchOrdine = createAction(
  '[Ordini] Fetch_Ordine',
  props<{ idOrdine: string }>()
);

export const SetOrdine = createAction(
  '[Ordini] Set_Ordine',
  props<{ payload: Ordine }>()
);

export const FetchCountOrdini = createAction(
  '[Ordini] Fetch_Count_Ordini'
);

export const UpdateOrdine = createAction(
  '[Ordini] Update_Ordine',
  props<{ payload: Ordine }>()
);

export const UpdateOrdineSuccess = createAction(
  '[Ordini] Update_Ordine_success'
);

export const UpdateOrdineFail = createAction(
  '[Ordini] Update_Ordine_fail',
  props<{payload: string}>()
);

export const FilterOrdini = createAction(
  '[Ordini] Filter_Ordini',
  props<{ numOmbrellone: string }>()
);



