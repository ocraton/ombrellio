import { ClientiService } from './../clienti.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as ClientiActions from './clienti.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Cliente } from '../cliente.model';

@Injectable()
export class ClientiEffects {

  constructor(private clientiService: ClientiService,
              private subService: SubscriptionService,
              private actions: Actions) { }

  clientiFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ClientiActions.FetchClienti),
      switchMap(() => {
        return this.clientiService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((data: Cliente[]) => {
        return ClientiActions.SetClienti({ payload: data });
      })
    )
  );

  createCliente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ClientiActions.CreateCliente),
      map(action => action.payload),
      switchMap((payload: { cliente: Cliente, numeroOmbrelloni: number }) => {
        return this.clientiService.createCliente(payload.cliente).then(
          res => ClientiActions.CreateClienteSuccess()
        ).catch(
          error => ClientiActions.CreateClienteFail(error)
        )
      })
    )
  );

  updateCliente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ClientiActions.UpdateClienti),
      map(action => action.payload),
      switchMap((cliente: Cliente) =>
        this.clientiService.updateCliente(cliente).then(
            res => ClientiActions.UpdateClientiSuccess()
          ).catch(
            error => ClientiActions.UpdateClientiFail(error)
          )
      )
    )
  );

  deleteCliente$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ClientiActions.DeleteCliente),
      switchMap((cliente) =>
        this.clientiService.deleteCliente(cliente.payload).then(
          () => ClientiActions.DeleteClienteSuccess({ payload: 'success' })
        ).catch(
          error => ClientiActions.DeleteClienteFail(error)
        )
      ))
  );




}
