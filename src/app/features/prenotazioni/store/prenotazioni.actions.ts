import { createAction, props } from '@ngrx/store';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Prenotazione } from '../prenotazione.model';


export const SetCountPrenotazioni = createAction(
  '[Prenotazioni] Set_Count_Prenotazioni',
  props<{ payload: number }>()
);

export const FetchPrenotazioni = createAction(
  '[Prenotazioni] Fetch_Prenotazioni',
  props<{ startDate: Date, endDate: Date }>()
);

export const FetchPrenotazioniOmbrelloni = createAction(
  '[Prenotazioni] Fetch_Prenotazioni_Ombrelloni'
);

export const SetPrenotazioniOmbrelloni = createAction(
  '[Ombrelloni] Set_Prenotazioni_Ombrelloni',
  props<{ payload: Ombrellone[] }>()
);

export const SetPrenotazioni = createAction(
  '[Prenotazioni] Set_Prenotazioni',
  props<{ payload: Prenotazione[] }>()
);

export const FetchPrenotazione = createAction(
  '[Prenotazioni] Fetch_Prenotazione',
  props<{ idPrenotazione: string }>()
);

export const SetPrenotazione = createAction(
  '[Prenotazioni] Set_Prenotazione',
  props<{ payload: Prenotazione }>()
);

export const FetchCountPrenotazioni = createAction(
  '[Prenotazioni] Fetch_Count_Prenotazioni'
);

export const UpdatePrenotazione = createAction(
  '[Prenotazioni] Update_Prenotazione',
  props<{ payload: Prenotazione }>()
);

export const UpdatePrenotazioneSuccess = createAction(
  '[Prenotazioni] Update_Prenotazione_success'
);

export const UpdatePrenotazioneFail = createAction(
  '[Prenotazioni] Update_Prenotazione_fail',
  props<{payload: string}>()
);

export const FilterPrenotazioni = createAction(
  '[Prenotazioni] Filter_Prenotazioni',
  props<{ numOmbrellone: string }>()
);



