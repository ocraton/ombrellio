import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import * as ChaletActions from './chalet.actions';
import { ChaletsService } from '../chalets.service';
import { Chalet } from '../chalet.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Injectable()
export class ChaletEffects {

  constructor(private subService: SubscriptionService,
    private actions$: Actions,
    private chaletsService: ChaletsService) { }

  @Effect()
  chaletsFetch$ = this.actions$.pipe(
    ofType(ChaletActions.FETCH_CHALETS),
    switchMap(() => {
      return this.chaletsService.getAll().pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((chalet: Chalet[]) => {
      return {
        type: ChaletActions.SET_CHALETS,
        payload: chalet
      };
    })
  );

  @Effect()
  createChalet$ = this.actions$.pipe(
    ofType(ChaletActions.CREATE_CHALET),
    map((action: ChaletActions.CreateChalet) => action.payload),
    switchMap((payload) =>
      this.chaletsService.createChalet(payload.chalet, payload.numeroOmbrelloni).then(
        res => new ChaletActions.CreateChaletSuccess()
      ).catch(
        error => new ChaletActions.CreateChaletFail(error)
      )
    )
  );


  @Effect()
  updateChalet$ = this.actions$.pipe(
    ofType(ChaletActions.UPDATE_CHALET),
    map((action: ChaletActions.UpdateChalet) => action.payload),
    switchMap((chalet: Chalet) => this.chaletsService.updateChalet(chalet).then(
        res => new ChaletActions.UpdateChaletSuccess()
      ).catch(
        error => new ChaletActions.UpdateChaletFail(error)
      )
    )
  );


}
