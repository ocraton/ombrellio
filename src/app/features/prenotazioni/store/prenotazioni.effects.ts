import { Ombrellone } from './../../ombrelloni/ombrellone.model';
import { Attrezzatura } from './../../attrezzature/attrezzatura.model';
import { Prenotazione } from './../prenotazione.model';
import { PrenotazioniService } from './../prenotazioni.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as PrenotazioniActions from './prenotazioni.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Utente } from '../../utenti/utente.model';
import { Cliente } from '../../clienti/cliente.model';
import { Mappa } from '../mappa.model';
import { Listino } from '../../listino/listino.model';


@Injectable()
export class PrenotazioniEffects {

  constructor(private prenotazioniService: PrenotazioniService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  prenotazioniFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioni),
      switchMap(({ startDate, endDate }) => {
        return this.prenotazioniService.getAll(startDate, endDate).pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Prenotazione[]) => {
        return PrenotazioniActions.SetPrenotazioni({ payload: data });
      }))
  );

  prenotazioniListaFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniLista),
      switchMap(() => {
        return this.prenotazioniService.getAllLista().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Prenotazione[]) => {
        return PrenotazioniActions.SetPrenotazioni({ payload: data });
      }))
    );

  prenotazioniombrelloniFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniOmbrelloni),
      switchMap(() => this.prenotazioniService.getAllOmbrelloni()
        .pipe( takeUntil(this.subService.unsubscribe$) )
      ),
      map((data: Ombrellone[]) => PrenotazioniActions.SetPrenotazioniOmbrelloni({ payload: data }))
    ));

  prenotazioniMappaFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniMappa),
      switchMap(() => {
        return this.prenotazioniService.getMappa().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Mappa[]) => {
        return PrenotazioniActions.SetPrenotazioniMappa({ payload: data });
      })
    )
  );

  clientiFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniClienti),
      switchMap(() => {
        return this.prenotazioniService.getClienti().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Utente[]) => {
        return PrenotazioniActions.SetPrenotazioniClienti({ payload: data });
      }))
  );

  attrezzatureFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniAttrezzature),
      switchMap(() => {
        return this.prenotazioniService.getAttrezzature().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Attrezzatura[]) => {
        return PrenotazioniActions.SetPrenotazioniAttrezzature({ payload: data });
      }))
  );

  listinoFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioniListino),
      switchMap(() => {
        return this.prenotazioniService.getListino().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Listino[]) => {
        return PrenotazioniActions.SetPrenotazioniListino({ payload: data });
      }))
  );

  createPrenotazioniCliente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.CreatePrenotazioniCliente),
      map(action => action.payload),
      switchMap((payload: { cliente: Cliente }) => {
        return this.prenotazioniService.createCliente(payload.cliente).then(
          res => PrenotazioniActions.CreatePrenotazioniClienteSuccess()
        ).catch(
          error => PrenotazioniActions.CreatePrenotazioniClienteFail(error)
        )
      })
    )
  );

  createPrenotazione$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.CreatePrenotazione),
      map(action => action),
      switchMap((action: { ombrellone: Ombrellone, cliente: Cliente, rangeDate: any, attrezzature: any[], isPagato: boolean, isStagionale: boolean, acconto: number, prezzo: number, note: string }) => {
        return this.prenotazioniService.createPrenotazione(action.ombrellone, action.cliente, action.rangeDate, action.attrezzature, action.isPagato, action.isStagionale, action.acconto, action.prezzo, action.note).then(
          res => PrenotazioniActions.CreatePrenotazioneSuccess()
        ).catch(
          error => PrenotazioniActions.CreatePrenotazioneFail(error)
        )
      })
    ), { dispatch: false }
  );

  updatePrenotazione$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.UpdatePrenotazione),
      map(action => action),
      switchMap((action: { idPrenotazione: string, ombrellone: Ombrellone, cliente: Cliente, rangeDate: any, dataPrenotazione: Date, attrezzature: any[], isPagato: boolean, isStagionale: boolean, acconto: number, prezzo: number, note: string }) => {
        return this.prenotazioniService.updatePrenotazione(action.idPrenotazione, action.ombrellone, action.cliente, action.rangeDate, action.dataPrenotazione, action.attrezzature, action.isPagato, action.isStagionale, action.acconto, action.prezzo, action.note).then(
          res => PrenotazioniActions.UpdatePrenotazioneSuccess()
        ).catch(
          error => PrenotazioniActions.UpdatePrenotazioneFail(error)
        )
      })
    ), { dispatch: false }
  );

  deletePrenotazione$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.DeletePrenotazione),
      switchMap((prenotazione) =>
        this.prenotazioniService.deletePrenotazione(prenotazione.uid_prenotazione).then(
          () => PrenotazioniActions.DeletePrenotazioneSuccess({payload: 'success'})
        ).catch(
          error => PrenotazioniActions.DeletePrenotazioneFail(error)
        )
      ))
  );


}
