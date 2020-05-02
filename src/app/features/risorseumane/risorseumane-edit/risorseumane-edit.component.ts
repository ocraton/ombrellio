import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRisorsaumana from '../store/risorsaumana.reducers';
import * as RisorsaumanaActions from '../store/risorsaumana.actions';
import { Risorsaumana } from '../risorsaumana.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

import * as fromAzienda from '../../aziende/store/azienda.reducers';
import * as AziendaActions from '../../aziende/store/azienda.actions';
import { Azienda } from '../../aziende/azienda.model';

@Component({
  selector: 'app-risorseumane-edit',
  templateUrl: './risorseumane-edit.component.html',
  styleUrls: ['./risorseumane-edit.component.css']
})
export class RisorseumaneEditComponent implements OnInit {

  id: number;
  editMode = false;
  risorsaumanaForm: FormGroup;
  risorsaumana: Risorsaumana;
  risorsaumanaState: Observable<fromRisorsaumana.State>;
  aziendaState: Observable<fromAzienda.State>;
  aziende: Azienda[];
  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRisorsaumana.FeatureState>,
              private _snackBar: MatSnackBar,
              private storeAzienda: Store<fromAzienda.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.risorsaumanaState = this.store.select('risorseumane');
    // this.storeAzienda.dispatch(new AziendaActions.FetchAziende());
    // this.storeAzienda.select('aziende')
    // .subscribe((aziendaState: fromAzienda.State) => {
    //   this.aziende = aziendaState.azienda
    // });

  }


  onSave() {
    this.risorsaumana = this.risorsaumanaForm.value
    let datestring = moment(this.risorsaumana.data_nascita).format('YYYY-MM-DD');
    this.risorsaumana.data_nascita = datestring;
    if (this.editMode) {
      this.store.dispatch(new RisorsaumanaActions.UpdateRisorsaumana({
        index: this.id,
        updateRisorsaumana: this.risorsaumana
      }));
    } else {
      this.store.dispatch(new RisorsaumanaActions.CreateRisorsaumana(this.risorsaumana));
    }
    this.store.select('risorseumane').subscribe(
      (risorseumane) => {
        if(!(risorseumane.error != null)) {
          this.editMode ? this.showSuccessMessage("Risorsa umana salvato con successo") :
                          this.showSuccessMessage("Risorsa umana creato con successo")
        }
      }
    ).unsubscribe()
  }

  initForm() {

    let azienda_id = '';
    let nome = '';
    let cognome = '';
    let email = '';
    let cellulare = '';
    let cap = '';
    let c_fiscale = '';
    let citta = '';
    let indirizzo = '';
    let provincia = '';
    let data_nascita = '';

    if (this.editMode) {
      this.store.select('risorseumane')
      .pipe(take(1))
      .subscribe((risorsaumanaState: fromRisorsaumana.State) => {
        risorsaumanaState.risorseumane.data.map(
          (c) => {
            if(c.id == this.id.toString()) {
              azienda_id = c.azienda_id;
              nome = c.nome;
              cognome = c.cognome;
              email = c.email;
              cellulare = c.cellulare;
              cap = c.cap;
              c_fiscale = c.c_fiscale;
              citta = c.citta;
              indirizzo = c.indirizzo;
              provincia = c.provincia;
              data_nascita = c.data_nascita
            }
          }
        )
      });
    }

    this.risorsaumanaForm = new FormGroup({
      'azienda_id': new FormControl(azienda_id, Validators.required),
      'nome': new FormControl(nome, Validators.required),
      'cognome': new FormControl(cognome, Validators.required),
      'email': new FormControl(email, [Validators.email, Validators.required]),
      'cellulare': new FormControl(cellulare, Validators.pattern('[0-9]{10}')),
      'data_nascita': new FormControl(data_nascita),
      'citta': new FormControl(citta),
      'indirizzo': new FormControl(indirizzo),
      'provincia': new FormControl(provincia),
      'cap': new FormControl(cap, Validators.pattern('[0-9]{5}')),
      'c_fiscale': new FormControl(c_fiscale, Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$'))
    });
  }

  showSuccessMessage(message: string) {
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.risorsaumanaForm.reset();
      this.risorsaumanaForm.markAsUntouched();
    }
    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });
    snackBarRef.onAction().subscribe(()=>
      this.editMode ? null : this.router.navigate(['../'], {relativeTo: this.route})
    );
  }


}
