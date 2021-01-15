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

  // prenotazioneCountFetch$: Observable<Action> = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(PrenotazioniActions.FetchCountPrenotazioni),
  //     switchMap(() => {
  //       return this.prenotazioniService.getCountPrenotazioni()
  //     }),
  //     map((numprenotazioni) => {
  //       return PrenotazioniActions.SetCountPrenotazioni(numprenotazioni['count'])
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
