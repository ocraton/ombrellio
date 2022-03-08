import { ChaletsService } from './../chalets.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as ChaletActions from './chalet.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Chalet } from '../chalet.model';

@Injectable()
export class ChaletEffects {

  constructor(private chaletService: ChaletsService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  chaletsFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ChaletActions.FetchChalets),
      switchMap(() => {
        return this.chaletService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Chalet[]) => {
        return ChaletActions.SetChalets({ payload: data });
      })
    )
  );

  createChalet$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ChaletActions.CreateChalet),
      map(action => action.payload),
      switchMap((payload: { chalet: Chalet }) => {
        return this.chaletService.createChalet(payload.chalet).then(
          res => ChaletActions.CreateChaletSuccess()
        ).catch(
          error => ChaletActions.CreateChaletFail(error)
        )
      })
    )
  );

  updateChalet$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ChaletActions.UpdateChalet),
      map(action => action.payload),
      switchMap((chalet: Chalet) =>
          this.chaletService.updateChalet(chalet).then(
            res => ChaletActions.UpdateChaletSuccess()
          ).catch(
            error => ChaletActions.UpdateChaletFail(error)
          )
      )
    )
  );



}
