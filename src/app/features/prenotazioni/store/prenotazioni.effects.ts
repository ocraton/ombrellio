import { Prenotazione } from './../prenotazione.model';
import { PrenotazioniService } from './../prenotazioni.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as PrenotazioniActions from './prenotazioni.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Utente } from '../../utenti/utente.model';
import { Cliente } from '../../clienti/cliente.model';

@Injectable()
export class PrenotazioniEffects {

  constructor(private prenotazioniService: PrenotazioniService,
              private subService: SubscriptionService,
              private actions: Actions) { }


  prenotazioniFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.FetchPrenotazioni),
      switchMap(({startDate, endDate}) => {
        return this.prenotazioniService.getAll(startDate, endDate).pipe(
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
      switchMap(() => {
        return this.prenotazioniService.getAllOmbrelloni().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Ombrellone[]) => {
        return PrenotazioniActions.SetPrenotazioniOmbrelloni({ payload: data });
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

  createPrenotazioniCliente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.CreatePrenotazioniCliente),
      map(action => action.payload),
      switchMap((payload: { cliente: Cliente }) => {
        console.log('effectCreatePrenotazioniCliente')
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
      switchMap((action : { ombrellone: Ombrellone, cliente: Cliente, rangeDate: any }) => {
        return this.prenotazioniService.createPrenotazione(action.ombrellone, action.cliente, action.rangeDate).then(
          res => PrenotazioniActions.CreatePrenotazioneSuccess()
        ).catch(
          error => PrenotazioniActions.CreatePrenotazioneFail(error)
        )
      })
    )
  );

  deletePrenotazione$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(PrenotazioniActions.DeletePrenotazione),
      switchMap((prenotazione) =>
        this.prenotazioniService.deletePrenotazione(prenotazione.uid_prenotazione).then(
          () => PrenotazioniActions.DeletePrenotazioneSuccess({payload: prenotazione.uid_prenotazione})
        ).catch(
          error => PrenotazioniActions.DeletePrenotazioneFail(error)
        )
      ))
  );

  // prenotazioneFetch$: Observable<Action> = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(PrenotazioniActions.FetchPrenotazione),
  //     switchMap(({idPrenotazione}) => {
  //       return this.prenotazioniService.getPrenotazione(idPrenotazione)
  //     }),
  //     map((prenotazione: Prenotazione) => {
  //       return PrenotazioniActions.SetPrenotazione({ payload: prenotazione })
  //     }))
  //   );


  // updatePrenotazione$: Observable<Action> = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(PrenotazioniActions.UpdatePrenotazione),
  //     map(action => action.payload),
  //     switchMap((prenotazione: Prenotazione) =>
  //       this.prenotazioniService.updatePrenotazione(prenotazione).then(
  //         () => PrenotazioniActions.UpdatePrenotazioneSuccess()
  //       ).catch(
  //         error => PrenotazioniActions.UpdatePrenotazioneFail(error)
  //       )
  //     )
  //   )
  // );


}
