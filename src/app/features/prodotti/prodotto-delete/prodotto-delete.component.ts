import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromProdotto from '../store/prodotto.reducers';
import * as ProdottoActions from '../store/prodotto.actions';
import { Prodotto } from '../prodotto.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdottoListComponent } from '../prodotto-list/prodotto-list.component';


@Component({
  selector: 'app-prodotto-delete',
  templateUrl: './prodotto-delete.component.html',
  styleUrls: ['./prodotto-delete.component.css']
})
export class ProdottoDeleteComponent implements OnInit {

  prodotto: Prodotto;
  prodotti: Prodotto[];
  prodottoState: Observable<fromProdotto.State>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromProdotto.FeatureState>,
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
    this.store.dispatch(new ProdottoActions.DeleteProdotto(this.prodotto));
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
