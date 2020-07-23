import { Prodotto } from '../prodotto.model';
import { ProdottiService } from '../prodotti.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as ProdottiActions from './prodotti.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Categoria } from '../../categorie/categoria.model';

@Injectable()
export class ProdottiEffects {

  constructor(private prodottiService: ProdottiService,
              private subService: SubscriptionService,
              private actions: Actions) { }


  prodottiExistFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.FetchProdottiExist),
      switchMap(() => {
        return this.prodottiService.getOneAtLeast().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((prodotto: Prodotto[]) => {
        return ProdottiActions.SetProdottiExist({payload: prodotto})
      }))
    );

  prodottiByCategoriaFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.FetchProdottiByCategoria),
      switchMap((categoria: Categoria) => {
        return this.prodottiService.getProdottiByCategory(categoria).pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((prodotto: Prodotto[]) => {
        return ProdottiActions.SetProdotti({payload: prodotto})
      }))
    );

  prodottiCategorieFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.FetchProdottiExist),
      switchMap(() => {
        return this.prodottiService.getAllProdottiCategorie().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((categorie: Categoria[]) => {
        return ProdottiActions.SetProdottiCategorie({ payload: categorie})
      }))
    );


  createProdotto$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.CreateProdotto),
      switchMap((prodotto) =>
        this.prodottiService.createProdotto(prodotto.payload).then(
          () => ProdottiActions.CreateProdottoSuccess()
        ).catch(
          error => ProdottiActions.CreateProdottoFail(error)
        )
      ))
  );

  updateProdotto$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.UpdateProdotto),
      switchMap((prodotto) =>
        this.prodottiService.updateProdotto(prodotto.payload).pipe(
          map(res => res ? ProdottiActions.UpdateProdottoSuccess() :
            ProdottiActions.UpdateProdottoFail({payload: 'error'}))
        )
      ))
    );



  deleteProdotto$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ProdottiActions.DeleteProdotto),
      switchMap((prodotto) =>
        this.prodottiService.deleteProdotto(prodotto.payload).then(
          () => ProdottiActions.DeleteProdottoSuccess({payload: 'success'})
        ).catch(
          error => ProdottiActions.DeleteProdottoFail(error)
        )
      ))
  );

}
