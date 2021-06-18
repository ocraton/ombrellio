import { OmbrelloniService } from '../ombrelloni.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as OmbrelloniActions from './ombrelloni.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Ombrellone } from '../ombrellone.model';
import { Mappa } from '../../prenotazioni/mappa.model';

@Injectable()
export class OmbrelloniEffects {

  constructor(private ombrelloniService: OmbrelloniService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  ombrelloniFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OmbrelloniActions.FetchOmbrelloni),
      switchMap(() => {
        return this.ombrelloniService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Ombrellone[]) => {
        return OmbrelloniActions.SetOmbrelloni({ payload: data });
      })
    )
  );

  createOmbrellone$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OmbrelloniActions.CreateOmbrellone),
      map(action => action.payload),
      switchMap((payload: { ombrellone: Ombrellone, numeroOmbrelloni: number }) => {
        return this.ombrelloniService.createOmbrellone(payload.ombrellone).then(
          res => OmbrelloniActions.CreateOmbrelloneSuccess()
        ).catch(
          error => OmbrelloniActions.CreateOmbrelloneFail(error)
        )
      })
    )
  );

  updateOmbrellone$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OmbrelloniActions.UpdateOmbrelloni),
      map(action => action.payload),
      switchMap((ombrellone: Ombrellone) =>
        this.ombrelloniService.updateOmbrellone(ombrellone).then(
            res => OmbrelloniActions.UpdateOmbrelloniSuccess()
          ).catch(
            error => OmbrelloniActions.UpdateOmbrelloniFail(error)
          )
      )
    )
  );

  deleteOmbrellone$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OmbrelloniActions.DeleteOmbrellone),
      switchMap((ombrellone) =>
        this.ombrelloniService.deleteOmbrellone(ombrellone.payload).then(
          () => OmbrelloniActions.DeleteOmbrelloneSuccess({ payload: 'success' })
        ).catch(
          error => OmbrelloniActions.DeleteOmbrelloneFail(error)
        )
      ))
  );

  ombrelloniMappaFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(OmbrelloniActions.FetchOmbrelloniMappa),
      switchMap(() => {
        return this.ombrelloniService.getMappa().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Mappa[]) => {
        return OmbrelloniActions.SetOmbrelloniMappa({ payload: data });
      })
    )
  );



}
