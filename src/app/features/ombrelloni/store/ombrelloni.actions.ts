import { createAction, props } from '@ngrx/store';
import { Ombrellone } from '../ombrellone.model';

export const SetOmbrelloni = createAction(
  '[Ombrelloni] Set_ombrelloni',
  props<{payload: Ombrellone[]}>()
);

export const UpdateOmbrelloni = createAction(
  '[Ombrelloni] Update_ombrelloni',
  props<{payload: Ombrellone}>()
);

export const UpdateOmbrelloniSuccess = createAction(
  '[Ombrelloni] Update_ombrelloni_success'
);

export const UpdateOmbrelloniFail = createAction(
  '[Ombrelloni] Update_ombrelloni_fail',
  props<{payload: string}>()
);
export const CreateOmbrellone = createAction(
  '[Ombrelloni] Create_ombrellone',
  props<{ payload: { ombrellone: Ombrellone }}>()
);

export const CreateOmbrelloneSuccess = createAction(
  '[Ombrelloni] Create_ombrellone_success'
);

export const CreateOmbrelloneFail = createAction(
  '[Ombrelloni] Create_ombrellone_fail',
  props<{ payload: string }>()
);
export const DeleteOmbrellone = createAction(
  '[Ombrelloni] Delete_ombrellone',
  props<{ payload: Ombrellone }>()
);
export const DeleteOmbrelloneSuccess = createAction(
  '[Ombrelloni] Delete_ombrellone_success',
  props<{ payload: string }>()
);
export const DeleteOmbrelloneFail = createAction(
  '[Ombrelloni] Delete_ombrellone_fail',
  props<{ payload: string }>()
);
export const FetchOmbrelloni = createAction('[Ombrelloni] Fetch_ombrelloni');

