import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import * as AziendaActions from './azienda.actions';
import { AziendeService } from '../aziende.service';
import { Azienda } from '../azienda.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class AziendaEffects {

  @Effect()
  aziendeFetch$ = this.actions$.pipe(
    ofType(AziendaActions.FETCH_AZIENDE),
    switchMap((action: AziendaActions.FetchAziende) => {
      return this.aziendeService.getAll(action.payload)
    }),
    map((azienda: Azienda[]) => {
      return {
        type: AziendaActions.SET_AZIENDE,
        payload: azienda
      };
    })
  );

  @Effect()
  aziendaFetch$ = this.actions$.pipe(
    ofType(AziendaActions.FETCH_AZIENDA),
    switchMap((action: AziendaActions.FetchAzienda) => {
      return this.aziendeService.getAzienda(action.payload.idAzienda)
    }),
    map((azienda: Azienda) => {
      return {
        type: AziendaActions.SET_AZIENDA,
        payload: azienda
      };
    }
    )
  );

  @Effect()
  aziendaCountFetch$ = this.actions$.pipe(
    ofType(AziendaActions.FETCH_COUNT_AZIENDE),
    switchMap((action: AziendaActions.FetchCountAziende) => {
      return this.aziendeService.getCountAziende();
    }),
    map(countAziende => {
      return { type: AziendaActions.SET_COUNT_AZIENDE, payload: countAziende['count'] };
    }
    )
  );

  @Effect({ dispatch: false })
  createAzienda$ = this.actions$.pipe(
    ofType(AziendaActions.CREATE_AZIENDA),
    map((action: AziendaActions.CreateAzienda) => action.payload),
    switchMap((azienda: Azienda) =>
      this.aziendeService.createAzienda(azienda).then(
        docRef => { new AziendaActions.CreateAziendaSuccess(docRef.id.toString()) }
      ).catch(
        error => { new AziendaActions.CreateAziendaFail(error) }
      )
    )
  );

  @Effect({ dispatch: false })
  aziendeDelete = this.actions$.pipe(
    ofType(AziendaActions.DELETE_AZIENDA),
    map((action: AziendaActions.DeleteAzienda) => action.payload),
    switchMap((aziendaId) =>
      this.aziendeService.deleteAzienda(aziendaId).then(
        () => { new AziendaActions.DeleteAziendaSuccess('') },
        catchError(err => of(new AziendaActions.DeleteAziendaFail(err)))
      )
    )
  );

  constructor(private actions$: Actions,
    private aziendeService: AziendeService,
    private router: Router) { }

}
