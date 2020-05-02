import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, mergeMap, catchError} from 'rxjs/operators';
import * as ClienteActions from '../store/cliente.actions';
import { ClientiService } from '../clienti.service';
import { Clienti } from '../clienti.model';
import { Cliente } from '../cliente.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ClienteEffects {

  @Effect()
  clientiFetch = this.actions$.pipe(
    ofType(ClienteActions.FETCH_CLIENTI),
    switchMap((action: ClienteActions.FetchClienti) => {      
      return this.clientiService.getAll(action.payload.search, action.payload.page)
    }), 
    map((clienti: Clienti) => {   
        return {
          type: ClienteActions.SET_CLIENTI,
          payload: clienti
        };
      }
    )
  );

  @Effect()
  clientiStore = this.actions$.pipe(
    ofType(ClienteActions.CREATE_CLIENTE),
    map((action: ClienteActions.CreateCliente) => action.payload),
    mergeMap((cliente: Cliente) =>
    this.clientiService.storeCliente(cliente).pipe(        
      map( (newCliente: Cliente) =>
          new ClienteActions.CreateClienteSuccess(newCliente)
      ),
        catchError(err => of(new ClienteActions.CreateClienteFail(err)))
      )
    )
  );

  @Effect()
  clientiUpdate = this.actions$.pipe(
    ofType(ClienteActions.UPDATE_CLIENTE),
    map((action: ClienteActions.UpdateCliente) => action.payload),
    mergeMap(
      (payload) =>
      this.clientiService.updateCliente(payload.index , payload.updateCliente).pipe(
        map((updateCliente: Cliente) =>
            new ClienteActions.UpdateClienteSuccess(updateCliente)
        ),
        catchError(err => of(new ClienteActions.UpdateClienteFail(err)))
      )
    )
  );


  @Effect()
  clientiDelete = this.actions$.pipe(
    ofType(ClienteActions.DELETE_CLIENTE),
    map((action: ClienteActions.DeleteCliente) => action.payload),
    mergeMap((id: number) =>
      this.clientiService.deleteCliente(id).pipe(
        map(() => new ClienteActions.DeleteClienteSuccess(id)),
        catchError(err => of(new ClienteActions.DeleteClienteFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, 
              private clientiService: ClientiService,
              private router: Router) { }

}
