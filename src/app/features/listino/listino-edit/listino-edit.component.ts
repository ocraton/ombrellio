import { Component, OnInit, ViewChild, Input, Inject, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListinoComponent } from '../listino.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as listinoState from '../store/listino.state';
import * as fromApp from '../../../store/app.reducer';
import * as ListinoActions from '../store/listino.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Listino } from '../listino.model';

enum Mesi {
  Gennaio,
  Febbraio,
  Marzo,
  Aprile,
  Maggio,
  Giugno,
  Luglio,
  Agosto,
  Settembre,
  Ottobre,
  Novembre,
  Dicembre
}

@Component({
  selector: 'app-listino-edit',
  templateUrl: './listino-edit.component.html',
  styleUrls: ['./listino-edit.component.scss']
})
export class ListinoEditComponent implements OnInit, OnDestroy {

  listinoForm1: FormGroup;
  listinoForm2: FormGroup;
  listinoForm3: FormGroup;
  listinoForm4: FormGroup;
  listinoForm5: FormGroup;
  listinoForm6: FormGroup;
  listinoForm7: FormGroup;
  listinoForm8: FormGroup;
  listinoForm9: FormGroup;
  listinoForm10: FormGroup;
  listinoForm11: FormGroup;
  listinoForm12: FormGroup;
  arrayFormListini: any[] = [];

  listino: Listino[];
  listinoState: Observable<listinoState.default>;
  mesiCount = 12;

  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private subService: SubscriptionService,
    private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder) {

              }

  ngOnInit() {
    this.store.dispatch(ListinoActions.FetchListino());
    this.store.select('listino').subscribe(res => {
      this.listino = res.listino;

      for (let index = 1; index <= 12; index++) {
          let mese = this.getListinoByMese(index);

          if (mese[0] != null) {
            this.initFormMese(index, mese[0].prezzi[1].prezzo, mese[0].prezzi[2].prezzo, mese[0].prezzi[3].prezzo);
          } else {
            this.initFormMese(index, null, null, null);
          }
      }


    });
    this.arrayFormListini = [
      { nomeForm: this.listinoForm1, nomeMese: 'Gennaio', numeroMese: 1 },
      { nomeForm: this.listinoForm2, nomeMese: 'Febbraio', numeroMese: 2 },
      { nomeForm: this.listinoForm3, nomeMese: 'Marzo', numeroMese: 3 },
      { nomeForm: this.listinoForm4, nomeMese: 'Aprile', numeroMese: 4 },
      { nomeForm: this.listinoForm5, nomeMese: 'Maggio', numeroMese: 5 },
      { nomeForm: this.listinoForm6, nomeMese: 'Giugno', numeroMese: 6 },
      { nomeForm: this.listinoForm7, nomeMese: 'Luglio', numeroMese: 7 },
      { nomeForm: this.listinoForm8, nomeMese: 'Agosto', numeroMese: 8 },
      { nomeForm: this.listinoForm9, nomeMese: 'Settembre', numeroMese: 9 },
      { nomeForm: this.listinoForm10, nomeMese: 'Ottobre', numeroMese: 10 },
      { nomeForm: this.listinoForm11, nomeMese: 'Novembre', numeroMese: 11 },
      { nomeForm: this.listinoForm12, nomeMese: 'Dicembre', numeroMese: 12 },
    ]
    this.listinoState = this.store.select('listino');
  }

  getMese(numeroMese: number) {
    return Mesi[numeroMese - 1].toString();
  }

  getListinoByMese(numeroMese){
      return this.listino.filter(res => res.numero_mese == numeroMese)
  }


  onSave(numeroMese) {
    let listinoMese = this.getListinoByMese(numeroMese);
    if (listinoMese.length > 0) {
      this.store.dispatch(ListinoActions.UpdateListino({
        idListinoMese: listinoMese[0].id.toString(),
        numeroMese: numeroMese,
        valori: this.arrayFormListini[numeroMese - 1].nomeForm.value
      }));
    } else {
      this.arrayFormListini[numeroMese-1]
      this.store.dispatch(ListinoActions.CreateListino({
        numeroMese: numeroMese,
        valori: this.arrayFormListini[numeroMese - 1].nomeForm.value
      }));
    }
  }


  initFormMese(numeroMese, prezzo_range_1, prezzo_range_2, prezzo_range_3) {
    let formGroupValue = this.fb.group({
      'prezzo_range_1': [prezzo_range_1, Validators.compose([Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'prezzo_range_2': [prezzo_range_2, Validators.compose([Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'prezzo_range_3': [prezzo_range_3, Validators.compose([Validators.pattern('^\\d*(\\.\\d{1,2})?$')])]
    });
    switch (numeroMese) {
      case 1:
        this.listinoForm1 = formGroupValue;
        break;
      case 2:
        this.listinoForm2 = formGroupValue;
        break;
      case 3:
        this.listinoForm3 = formGroupValue;
        break;
      case 4:
        this.listinoForm4 = formGroupValue;
        break;
      case 5:
        this.listinoForm5 = formGroupValue;
        break;
      case 6:
        this.listinoForm6 = formGroupValue;
        break;
      case 7:
        this.listinoForm7 = formGroupValue;
        break;
      case 8:
        this.listinoForm8 = formGroupValue;
        break;
      case 9:
        this.listinoForm9 = formGroupValue;
        break;
      case 10:
        this.listinoForm10 = formGroupValue;
        break;
      case 11:
        this.listinoForm11 = formGroupValue;
        break;
      case 12:
        this.listinoForm12 = formGroupValue;
        break;

    }

  }


  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }




}
