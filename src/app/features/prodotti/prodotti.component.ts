import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as prodottiState from './store/prodotti.state';
import * as fromApp from '../../store/app.reducer';
import * as ProdottiActions from './store/prodotti.actions';
import { Categoria } from './../categorie/categoria.model';
import { SubscriptionService } from '../../core/services/subscription.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})

export class ProdottiComponent implements OnInit, OnDestroy {

  prodottoState: Observable<prodottiState.default>;
  categorie: Observable<Categoria[]>;

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(ProdottiActions.FetchProdottiExist());
    this.store.dispatch(ProdottiActions.FetchProdottiCategorie());
    this.prodottoState = this.store.select('prodotti');
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
