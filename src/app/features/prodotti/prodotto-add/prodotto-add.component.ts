import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as prodottiState from '../store/prodotti.state';
import * as fromApp from '../../../store/app.reducer';
import * as ProdottiActions from '../store/prodotti.actions';
import { Prodotto } from '../prodotto.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdottoListComponent } from '../prodotto-list/prodotto-list.component';
import { AllergeniService } from 'src/app/shared/services/allergeni.service';



@Component({
  selector: 'app-Prodotto-add',
  templateUrl: './prodotto-add.component.html',
  styleUrls: ['./prodotto-add.component.scss']
})
export class ProdottoAddComponent implements OnInit {

  prodottoForm: FormGroup;
  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    categoria_uid: '',
    id: '',
    prezzo: 0,
    visibile: true,
    min_quantita: 1,
    allergeni: null
  };
  allergeniData: Array<any> = [];
  categoriaId: string;
  prodottoState: Observable<prodottiState.default>;
  @ViewChild('formDirective') formDirective;


  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    private allergeniService: AllergeniService,
    public dialogRef: MatDialogRef<ProdottoListComponent>,
    @Inject(MAT_DIALOG_DATA) data: string) {
    this.categoriaId = data;
    this.allergeniService.getAllergeniList()
    .subscribe(res => {
      this.allergeniData = res
    })
  }


  ngOnInit() {
    this.initForm();
  }


  onSave() {
    this.prodotto.nome = this.prodottoForm.get('nome').value;
    this.prodotto.descrizione = this.prodottoForm.get('descrizione').value;
    this.prodotto.prezzo = +this.prodottoForm.get('prezzo').value;
    this.prodotto.min_quantita = +this.prodottoForm.get('min_quantita').value;
    this.prodotto.allergeni = this.prodottoForm.get('allergeniArray').value;
    this.prodotto.categoria_uid = this.categoriaId;
    this.store.dispatch(ProdottiActions.CreateProdotto({ payload: this.prodotto }));
    this.prodottoForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = '';
    let descrizione = '';
    let prezzo = 0;
    let min_quantita = 1;

    this.prodottoForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'descrizione': [descrizione, Validators.compose([Validators.minLength(3)])],
      'prezzo': [prezzo, Validators.compose([Validators.required, Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'min_quantita': [min_quantita, Validators.compose([Validators.required, Validators.pattern('^\\d*(\\.\\d{1})?$')])],
      'allergeniArray': this.fb.array([])
    });

  }

  onCheckboxChange(e) {
    const allergeniArray: FormArray = this.prodottoForm.get('allergeniArray') as FormArray;

    if (e.checked) {
      allergeniArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      allergeniArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          allergeniArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  close(): void {
    this.dialogRef.close();
  }

}
