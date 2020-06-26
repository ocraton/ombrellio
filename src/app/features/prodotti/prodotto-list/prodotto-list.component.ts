import { Categoria } from './../../categorie/categoria.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProdotto from '../store/prodotto.reducers';
import * as ProdottoActions from '../store/prodotto.actions';

import { Prodotto } from '../prodotto.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProdottoEditComponent } from '../prodotto-edit/prodotto-edit.component';
import { ProdottoDeleteComponent } from '../prodotto-delete/prodotto-delete.component';
import { ProdottoAddComponent } from '../prodotto-add/prodotto-add.component';

@Component({
  selector: 'app-prodotto-list',
  templateUrl: './prodotto-list.component.html',
  styleUrls: ['./prodotto-list.component.css']
})
export class ProdottoListComponent implements OnInit, OnDestroy {

  prodottoState: Observable<fromProdotto.State>;
  prodotto: Prodotto = null;
  @Input() categoria: Categoria;

  constructor(private store: Store<fromProdotto.FeatureState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit() {

  }

  onOpencategoriaPanel(){
    this.store.dispatch(new ProdottoActions.FetchProdottiByCategoria(this.categoria));
    this.prodottoState = this.store.select('prodotti');
  }

  onChangeProdottoVisibile(prodotto, visibile) {
    prodotto.visibile = visibile;
    this.store.dispatch(new ProdottoActions.UpdateProdotto(prodotto));
  }

  addProdotto(categoriaId) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = categoriaId;
    this.dialog.open(ProdottoAddComponent, dialogConfigDel);
  }

  editProdotto(prodotto) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = prodotto;
    this.dialog.open(ProdottoEditComponent, dialogConfigDel);
  }

  deleteProdotto(prodotto) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = prodotto;
    this.dialog.open(ProdottoDeleteComponent, dialogConfigDel);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

