import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../clienti/cliente.model';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Mappa } from '../mappa.model';
import { Prenotazione } from '../prenotazione.model';


export const SetCountPrenotazioni = createAction(
  '[Prenotazioni] Set_Count_Prenotazioni',
  props<{ payload: number }>()
);

export const FetchPrenotazioni = createAction(
  '[Prenotazioni] Fetch_Prenotazioni',
  props<{ startDate: Date, endDate: Date }>()
);

export const SetPrenotazioni = createAction(
  '[Prenotazioni] Set_Prenotazioni',
  props<{ payload: Prenotazione[] }>()
);

export const FetchPrenotazioniOmbrelloni = createAction(
  '[Prenotazioni] Fetch_Prenotazioni_Ombrelloni'
);

export const SetPrenotazioniOmbrelloni = createAction(
  '[Prenotazioni] Set_Prenotazioni_Ombrelloni',
  props<{ payload: Ombrellone[] }>()
);

export const FetchPrenotazioniMappa = createAction(
  '[Prenotazioni] Fetch_Prenotazioni_Mappa'
);

export const SetPrenotazioniMappa = createAction(
  '[Prenotazioni] Set_Prenotazioni_Mappa',
  props<{ payload: Mappa[] }>()
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

export const FetchPrenotazioniClienti = createAction(
  '[Prenotazioni] Fetch_Prenotazioni_Clienti'
);

export const SetPrenotazioniClienti = createAction(
  '[Prenotazioni] Set_Prenotazioni_Clienti',
  props<{ payload: Cliente[] }>()
);

export const CreatePrenotazioniCliente = createAction(
  '[Prenotazioni] Create_Prenotazioni_Cliente',
  props<{ payload: { cliente: Cliente } }>()
);

export const CreatePrenotazioniClienteSuccess = createAction(
  '[Prenotazioni] Create_Prenotazioni_Cliente_Success'
);

export const CreatePrenotazioniClienteFail = createAction(
  '[Prenotazioni] Create_Prenotazioni_Cliente_Fail',
  props<{ payload: string }>()
);

export const CreatePrenotazione = createAction(
  '[Prenotazioni] Create_Prenotazione',
  props<{ ombrellone: Ombrellone, cliente: Cliente, rangeDate: any }>()
);

export const CreatePrenotazioneSuccess = createAction(
  '[Prenotazioni] Create_Prenotazione_Success'
);

export const CreatePrenotazioneFail = createAction(
  '[Prenotazioni] Create_Prenotazione_Fail',
  props<{ payload: string }>()
);

export const DeletePrenotazione = createAction(
  '[Prenotazioni] Delete_Prenotazione',
  props<{ uid_prenotazione: string }>()
);

export const DeletePrenotazioneSuccess = createAction(
  '[Prenotazioni] Delete_Prenotazione_Success',
  props<{ payload: string }>()
);

export const DeletePrenotazioneFail = createAction(
  '[Prenotazioni] Delete_Prenotazione_Fail',
  props<{ payload: string }>()
);

