import { Listino } from './../listino.model';
import { ListinoService } from '../listino.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as ListinoActions from './listino.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';


@Injectable()
export class ListinoEffects {

  constructor(private listinoService: ListinoService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  listinoFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ListinoActions.FetchListino),
      switchMap(() => {
        return this.listinoService.getListino().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Listino[]) => {
        return ListinoActions.SetListino({ payload: data });
      }))
  );


}
