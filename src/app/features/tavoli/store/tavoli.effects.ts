import { TavoliService } from '../tavoli.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as TavoliActions from './tavoli.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Tavolo } from '../tavolo.model';

@Injectable()
export class TavoliEffects {

  constructor(private tavoliService: TavoliService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  tavoliFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(TavoliActions.FetchTavoli),
      switchMap(() => {
        return this.tavoliService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Tavolo[]) => {
        return TavoliActions.SetTavoli({ payload: data });
      })
    )
  );

  createTavolo$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(TavoliActions.CreateTavolo),
      map(action => action.payload),
      switchMap((payload: { tavolo: Tavolo, numeroOmbrelloni: number }) => {
        return this.tavoliService.createTavolo(payload.tavolo).then(
          res => TavoliActions.CreateTavoloSuccess()
        ).catch(
          error => TavoliActions.CreateTavoloFail(error)
        )
      })
    )
  );

  updateTavolo$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(TavoliActions.UpdateTavoli),
      map(action => action.payload),
      switchMap((tavolo: Tavolo) =>
        this.tavoliService.updateTavolo(tavolo).then(
            res => TavoliActions.UpdateTavoliSuccess()
          ).catch(
            error => TavoliActions.UpdateTavoliFail(error)
          )
      )
    )
  );

  deleteTavolo$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(TavoliActions.DeleteTavolo),
      switchMap((tavolo) =>
        this.tavoliService.deleteTavolo(tavolo.payload).then(
          () => TavoliActions.DeleteTavoloSuccess({ payload: 'success' })
        ).catch(
          error => TavoliActions.DeleteTavoloFail(error)
        )
      ))
  );




}
