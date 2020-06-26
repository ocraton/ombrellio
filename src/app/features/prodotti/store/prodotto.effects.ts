import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import * as ProdottoActions from './prodotto.actions';
import { ProdottiService } from '../prodotti.service';
import { Prodotto } from '../prodotto.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { Categoria } from '../../categorie/categoria.model';

@Injectable()
export class ProdottoEffects {

  constructor(private subService: SubscriptionService,
    private actions$: Actions,
    private prodottiService: ProdottiService) { }

  @Effect()
  prodottiExistFetch$ = this.actions$.pipe(
    ofType(ProdottoActions.FETCH_PRODOTTI_EXIST),
    switchMap(() => {
      return this.prodottiService.getOneAtLeast().pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((prodotto: Prodotto[]) => {
      return {
        type: ProdottoActions.SET_PRODOTTI_EXIST,
        payload: prodotto
      };
    })
  );

  @Effect()
  prodottiByCategoriaFetch$ = this.actions$.pipe(
    ofType(ProdottoActions.FETCH_PRODOTTI_BY_CATEGORIA),
    map((action: ProdottoActions.FetchProdottiByCategoria) => action.payload),
    switchMap((categoria: Categoria) => {
      return this.prodottiService.getProdottiByCategory(categoria).pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((prodotto: Prodotto[]) => {
      return {
        type: ProdottoActions.SET_PRODOTTI,
        payload: prodotto
      };
    })
  );

  @Effect()
  prodottiCategorieFetch$ = this.actions$.pipe(
    ofType(ProdottoActions.FETCH_PRODOTTI_EXIST),
    switchMap(() => {
      return this.prodottiService.getAllProdottiCategorie().pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((categorie: Categoria[]) => {
      return {
        type: ProdottoActions.SET_PRODOTTI_CATEGORIE,
        payload: categorie
      };
    })
  );

  @Effect()
  createProdotto$ = this.actions$.pipe(
    ofType(ProdottoActions.CREATE_PRODOTTO),
    map((action: ProdottoActions.CreateProdotto) => action.payload),
    switchMap((prodotto) =>
      this.prodottiService.createProdotto(prodotto).then(
        res => new ProdottoActions.CreateProdottoSuccess()
      ).catch(
        error => new ProdottoActions.CreateProdottoFail(error)
      )
    )
  );


  @Effect()
  updateProdotto$ = this.actions$.pipe(
    ofType(ProdottoActions.UPDATE_PRODOTTO),
    map((action: ProdottoActions.UpdateProdotto) => action.payload),
    switchMap((prodotto: Prodotto) =>
      this.prodottiService.updateProdotto(prodotto).pipe(
        map(res => res ? new ProdottoActions.UpdateProdottoSuccess() :
          new ProdottoActions.UpdateProdottoFail('error'))
      )
    ));

  @Effect()
  deleteProdotto$ = this.actions$.pipe(
    ofType(ProdottoActions.DELETE_PRODOTTO),
    map((action: ProdottoActions.DeleteProdotto) => action.payload),
    switchMap((prodotto) =>
      this.prodottiService.deleteProdotto(prodotto).then(
        res => new ProdottoActions.DeleteProdottoSuccess('success')
      ).catch(
        error => new ProdottoActions.DeleteProdottoFail(error)
      )
    )
  );


}
