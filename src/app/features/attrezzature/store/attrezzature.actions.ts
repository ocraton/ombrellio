import { createAction, props } from '@ngrx/store';
import { Attrezzatura } from '../attrezzatura.model';


export const SetAttrezzature = createAction(
  '[Attrezzature] Set_attrezzature',
  props<{ payload: Attrezzatura[] }>()
);
export const UpdateAttrezzatura = createAction(
  '[Attrezzature] Update_attrezzatura',
  props<{ payload: Attrezzatura }>()
);
export const UpdateAttrezzaturaSuccess = createAction(
  '[Attrezzature] Update_attrezzatura_success'
);
export const UpdateAttrezzaturaFail = createAction(
  '[Attrezzature] Update_attrezzatura_fail',
  props<{ payload: string }>()
);
export const UpdateAttrezzature = createAction(
  '[Attrezzature] Update_attrezzature',
  props<{ payload: Attrezzatura[] }>()
);
export const UpdateAttrezzatureSuccess = createAction(
  '[Attrezzature] Update_attrezzature_success'
);
export const UpdateAttrezzatureFail = createAction(
  '[Attrezzature] Update_attrezzatura_fail',
  props<{ payload: string }>()
);
export const CreateAttrezzatura = createAction(
  '[Attrezzature] Create_attrezzatura',
  props<{ payload: Attrezzatura }>()
);
export const CreateAttrezzaturaSuccess = createAction(
  '[Attrezzature] Create_attrezzature_success'
);
export const CreateAttrezzaturaFail = createAction(
  '[Attrezzature] Create_attrezzatura_fail',
  props<{ payload: string }>()
);
export const FetchAttrezzature = createAction(
  '[Attrezzature] Fetch_attrezzature'
);
export const FetchAttrezzaturaProdotti = createAction(
  '[Attrezzature] Fetch_attrezzaturaProdotti',
  props<{ payload: Attrezzatura }>()
);
export const FetchAttrezzaturaProdottiSuccess = createAction(
  '[Attrezzature] Fetch_attrezzaturaProdotti_success',
  props<{ payload: boolean }>()
);
export const DeleteAttrezzatura = createAction(
  '[Attrezzature] Delete_attrezzatura',
  props<{ payload: Attrezzatura }>()
);
export const DeleteAttrezzaturaSuccess = createAction(
  '[Attrezzature] Delete_attrezzatura_success',
  props<{ payload: string }>()
);
export const DeleteAttrezzaturaFail = createAction(
  '[Attrezzature] Delete_attrezzatura_fail',
  props<{ payload: string }>()
);

