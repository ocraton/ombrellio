import { UtentiService } from '../utenti.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as UtentiActions from './utenti.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Utente } from '../utente.model';

@Injectable()
export class UtentiEffects {

  constructor(private utentiService: UtentiService,
    private subService: SubscriptionService,
    private actions: Actions) { }


  createUtente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(UtentiActions.CreateUtente),
      map(action => action.payload),
      switchMap((payload: { utente: Utente, numeroOmbrelloni: number }) => {
        return this.utentiService.createUtente(payload.utente).then(
          res => UtentiActions.CreateUtenteSuccess()
        ).catch(
          error => UtentiActions.CreateUtenteFail(error)
        )
      })
    )
  );







}
