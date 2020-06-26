import { Categoria } from './../categorie/categoria.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProdotto from './store/prodotto.reducers';
import * as ProdottoActions from './store/prodotto.actions';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit, OnDestroy {

  prodottoState: Observable<fromProdotto.State>;
  categorie: Observable<Categoria[]>;
  constructor(private store: Store<fromProdotto.FeatureState>,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(new ProdottoActions.FetchProdottiExist());
    this.store.dispatch(new ProdottoActions.FetchProdottiCategorie());
    this.prodottoState = this.store.select('prodotti');
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
