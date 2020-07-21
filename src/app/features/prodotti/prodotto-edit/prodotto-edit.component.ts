import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Prodotto } from '../prodotto.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdottoListComponent } from '../prodotto-list/prodotto-list.component';
import { Categoria } from '../../categorie/categoria.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import * as prodottiState from '../store/prodotti.state';
import * as fromApp from '../../../store/app.reducer';
import * as ProdottiActions from '../store/prodotti.actions';


@Component({
  selector: 'app-prodotto-edit',
  templateUrl: './prodotto-edit.component.html',
  styleUrls: ['./prodotto-edit.component.scss']
})
export class ProdottoEditComponent implements OnInit, OnDestroy {

  prodottoForm: FormGroup;
  prodotto: Prodotto;
  categorie: Categoria[];
  prodottoState: Observable<prodottiState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdottoListComponent>,
    private subService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) data: Prodotto) {
    this.prodotto = data;
  }

  ngOnInit() {
    this.prodottoState = this.store.select('prodotti');
    this.initForm();
  }

  onSave() {
    this.prodotto.nome = this.prodottoForm.get('nome').value;
    this.prodotto.descrizione = this.prodottoForm.get('descrizione').value;
    this.prodotto.prezzo = this.prodottoForm.get('prezzo').value;
    this.prodotto.categoria_uid = this.prodottoForm.get('categoriaId').value
    this.store.dispatch(ProdottiActions.UpdateProdotto(this.prodotto));
    this.prodottoForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = this.prodotto.nome;
    let descrizione = this.prodotto.descrizione;
    let prezzo = this.prodotto.prezzo;
    let categoriaId = this.prodotto.categoria_uid;

    this.prodottoForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'descrizione': [descrizione, Validators.compose([Validators.required, Validators.minLength(3)])],
      'prezzo': [prezzo, Validators.compose([Validators.required])],
      'categoriaId': [categoriaId, Validators.compose([Validators.required])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
