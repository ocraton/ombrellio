import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as prodottiState from '../store/prodotti.state';
import * as fromApp from '../../../store/app.reducer';
import * as ProdottiActions from '../store/prodotti.actions';
import { Prodotto } from '../prodotto.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdottoListComponent } from '../prodotto-list/prodotto-list.component';

@Component({
  selector: 'app-prodotto-delete',
  templateUrl: './prodotto-delete.component.html',
  styleUrls: ['./prodotto-delete.component.scss']
})
export class ProdottoDeleteComponent implements OnInit {

  prodotto: Prodotto;
  prodotti: Prodotto[];
  prodottoState: Observable<prodottiState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<ProdottoListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Prodotto) {
    this.prodotto = data;
  }

  ngOnInit() {
    // this.store.dispatch(new ProdottoActions.FetchProdottiByCategoria(this.prodotto.categoria_uid))
    this.prodottoState = this.store.select('prodotti')
    this.prodottoState.subscribe(res => this.prodotti = res.prodotto)
  }

  onDelete() {
    this.store.dispatch(ProdottiActions.DeleteProdotto({payload: this.prodotto}));
    this.prodotti.map((c, index) => {
      if (c.id == this.prodotto.id) {
        this.prodotti.splice(index, 1);
      }
    }
    )
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
