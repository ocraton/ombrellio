import { Ordine } from './../ordini.model';
import { OrdiniService } from './../ordini.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as OrdiniActions from './ordini.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';

@Injectable()
export class OrdiniEffects {

  constructor(private ordiniService: OrdiniService,
              private subService: SubscriptionService,
              private actions: Actions) { }


  ordiniFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OrdiniActions.FetchOrdini),
      switchMap(({orderType}) => {
        return this.ordiniService.getAll(orderType).pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Ordine[]) => {
        return OrdiniActions.SetOrdini({ payload: data });
      }))
    );

  ordineFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OrdiniActions.FetchOrdine),
      switchMap(({idOrdine}) => {
        return this.ordiniService.getOrdine(idOrdine)
      }),
      map((ordine: Ordine) => {
        return OrdiniActions.SetOrdine({ payload: ordine })
      }))
    );

  ordineCountFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OrdiniActions.FetchCountOrdini),
      switchMap(() => {
        return this.ordiniService.getCountOrdini()
      }),
      map((numordini) => {
        return OrdiniActions.SetCountOrdini(numordini['count'])
      }))
    );


  updateOrdine$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OrdiniActions.UpdateOrdine),
      map(action => action.payload),
      switchMap((ordine: Ordine) =>
        this.ordiniService.updateOrdine(ordine).then(
          () => OrdiniActions.UpdateOrdineSuccess()
        ).catch(
          error => OrdiniActions.UpdateOrdineFail(error)
        )
      )
    )
  );


}
