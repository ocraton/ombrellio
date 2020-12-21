import { createAction, props } from '@ngrx/store';
import { Chalet } from '../chalet.model';

export const SetChalets = createAction(
  '[Chalet] Set_chalet',
  props<{payload: Chalet[]}>()
);

export const UpdateChalet = createAction(
  '[Chalet] Update_chalet',
  props<{payload: Chalet}>()
);

export const UpdateChaletSuccess = createAction('[Chalet] Update_chalet_success');

export const UpdateChaletFail = createAction(
  '[Chalet] Update_chalet_fail',
  props<{payload: string}>()
);
export const CreateChalet = createAction(
  '[Chalet] Create_chalet',
  props<{ payload: { chalet: Chalet, numeroOmbrelloni: number, numeroTavoli: number }}>()
);

export const CreateChaletSuccess = createAction('[Chalet] Create_chalet_success');

export const CreateChaletFail = createAction(
  '[Chalet] Create_chalet_fail',
  props<{ payload: string }>()
);

export const FetchChalets = createAction('[Chalet] Fetch_chalets');

