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
  selector: 'app-prodotto-add',
  templateUrl: './prodotto-add.component.html',
  styleUrls: ['./prodotto-add.component.css']
})
export class ProdottoAddComponent implements OnInit {

  prodottoForm: FormGroup;
  prodotto: Prodotto = {nome: '', descrizione: '', categoria_uid: '', id: '', prezzo: 0, visibile: true};
  categoriaId: string;
  prodottoState: Observable<fromProdotto.State>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromProdotto.FeatureState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdottoListComponent>,
    @Inject(MAT_DIALOG_DATA) data: string) {
    this.categoriaId = data;
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.prodotto.nome = this.prodottoForm.get('nome').value;
    this.prodotto.descrizione = this.prodottoForm.get('descrizione').value;
    this.prodotto.prezzo = +this.prodottoForm.get('prezzo').value;
    this.prodotto.categoria_uid = this.categoriaId;
    this.store.dispatch(new ProdottoActions.CreateProdotto(this.prodotto));
    this.prodottoForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = '';
    let descrizione = '';
    let prezzo = 0;

    this.prodottoForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'descrizione': [descrizione, Validators.compose([Validators.required, Validators.minLength(3)])],
      'prezzo': [prezzo, Validators.compose([Validators.required, Validators.pattern('^\\d*(\\.\\d{1,2})?$')])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

}
