import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, takeUntil } from 'rxjs/operators';
import * as OrdineActions from './ordine.actions';
import { OrdiniService } from '../ordini.service';
import { Ordine } from '../ordini.model';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Injectable()
export class OrdineEffects {

  constructor(private subService: SubscriptionService,
              private actions$: Actions,
              private ordiniService: OrdiniService){}

  @Effect()
  ordiniFetch$ = this.actions$.pipe(
    ofType(OrdineActions.FETCH_ORDINI),
    switchMap((action: OrdineActions.FetchOrdini) => {
      return this.ordiniService.getAll(action.payload.orderType).pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((ordine: Ordine[]) => {
      return {
        type: OrdineActions.SET_ORDINI,
        payload: ordine
      };
    })
  );

  @Effect()
  ordineFetch$ = this.actions$.pipe(
    ofType(OrdineActions.FETCH_ORDINE),
    switchMap((action: OrdineActions.FetchOrdine) => {
      return this.ordiniService.getOrdine(action.payload.idOrdine)
    }),
    map((ordine: Ordine) => {
      return {
        type: OrdineActions.SET_ORDINE,
        payload: ordine
      };
    }
    )
  );

  @Effect()
  ordineCountFetch$ = this.actions$.pipe(
    ofType(OrdineActions.FETCH_COUNT_ORDINI),
    switchMap((action: OrdineActions.FetchCountOrdini) => {
      return this.ordiniService.getCountOrdini();
    }),
    map(countOrdini => {
      return { type: OrdineActions.SET_COUNT_ORDINI, payload: countOrdini['count'] };
    }
    )
  );

  @Effect({ dispatch: false })
  updateOrdine$ = this.actions$.pipe(
    ofType(OrdineActions.UPDATE_ORDINE),
    map((action: OrdineActions.UpdateOrdine) => action.payload),
    switchMap((ordine: Ordine) =>
      this.ordiniService.updateOrdine(ordine).then(
        () => { new OrdineActions.UpdateOrdineSuccess('success') }
      ).catch(
        error => { new OrdineActions.UpdateOrdineFail(error) }
      )
    )
  );




}
