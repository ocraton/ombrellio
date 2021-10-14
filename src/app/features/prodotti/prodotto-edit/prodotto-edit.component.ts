import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
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
import { AllergeniService } from 'src/app/shared/services/allergeni.service';


@Component({
  selector: 'app-prodotto-edit',
  templateUrl: './prodotto-edit.component.html',
  styleUrls: ['./prodotto-edit.component.scss']
})
export class ProdottoEditComponent implements OnInit, OnDestroy {

  prodottoForm: FormGroup;
  prodotto: Prodotto;
  categorie: Categoria[];
  allergeniData: Array<any> = [];
  allergeniFormData = new FormArray([]);
  prodottoState: Observable<prodottiState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    private allergeniService: AllergeniService,
    public dialogRef: MatDialogRef<ProdottoListComponent>,
    private subService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) data: Prodotto) {
    this.prodotto = data;
    this.allergeniService.getAllergeniList()
      .subscribe(res => {
        this.allergeniData = res
      })
  }

  ngOnInit() {
    this.prodottoState = this.store.select('prodotti');
    this.initForm();
  }

  onSave() {
    this.prodotto.nome = this.prodottoForm.get('nome').value;
    this.prodotto.descrizione = this.prodottoForm.get('descrizione').value;
    this.prodotto.prezzo = +this.prodottoForm.get('prezzo').value;
    this.prodotto.categoria_uid = this.prodottoForm.get('categoriaId').value
    this.prodotto.min_quantita = +this.prodottoForm.get('min_quantita').value;
    this.prodotto.allergeni = this.prodottoForm.get('allergeniArray').value;
    this.store.dispatch(ProdottiActions.UpdateProdotto({payload: this.prodotto}));
    this.prodottoForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = this.prodotto.nome;
    let descrizione = this.prodotto.descrizione;
    let prezzo = this.prodotto.prezzo;
    let categoriaId = this.prodotto.categoria_uid;
    let min_quantita = this.prodotto.min_quantita;

    if (this.prodotto.allergeni){
      this.prodotto.allergeni.forEach((item) => {
        this.allergeniFormData.push(new FormControl(item));
      });
    }

    this.prodottoForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'descrizione': [descrizione, Validators.compose([Validators.minLength(3)])],
      'prezzo': [prezzo, Validators.compose([Validators.required, Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'categoriaId': [categoriaId, Validators.compose([Validators.required])],
      'min_quantita': [min_quantita, Validators.compose([Validators.required, Validators.pattern('^\\d*(\\.\\d{1})?$')])],
      'allergeniArray': this.allergeniFormData
    });

  }

  getProdottoHasAllergene(idAllergene){
    if(this.prodotto.allergeni) {
      var find = this.prodotto.allergeni.find(function (value) {
        return value == idAllergene
      });
      return find
    } else {
      return false
    }
  }

  onCheckboxChange(e) {

    if (e.checked) {
      this.allergeniFormData.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      this.allergeniFormData.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          this.allergeniFormData.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
