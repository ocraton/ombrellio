import { UpdateChaletSuccess } from './../../../../../.history/src/app/features/chalet/store/chalet.actions_20200503112740';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';
import { Chalet } from '../chalet.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as fromApp from '../../../store/app.reducers';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chalet-edit',
  templateUrl: './chalet-edit.component.html',
  styleUrls: ['./chalet-edit.component.css']
})
export class ChaletEditComponent implements OnInit {

  id: number;
  editMode = false;
  chaletForm: FormGroup;
  chalet: Chalet;
  chaletState: Observable<fromChalet.State>;
  authUID: string;
  indirizzo: FormGroup;

  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromChalet.FeatureState>,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params['id'] != null;
      }
    );
    this.initForm();
    this.chaletState = this.store.select('chalets');
    this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
  }


  onSave() {
    this.chalet = this.chaletForm.value
    this.chalet.id = this.id.toString();
    this.chalet.utente_uid = this.authUID
    this.chalet.created_at = new Date()
    this.store.dispatch(new ChaletActions.UpdateChalet(this.chalet))
    this.store.select('chalets')
      .subscribe(chalet => {
        if(!(chalet.error != null)) {
          this.showSuccessMessage("Chalet salvato con successo")
        }
      }
    ).unsubscribe()
  }

  initForm() {

    let ragione_sociale = '';
    let telefono = '';
    let codice_accesso = '';
    let indirizzo = {
      provincia: '',
      citta: '',
      via: '',
      civico: ''
    }

    this.store.select('chalets')
    .pipe(take(1))
    .subscribe((chaletState: fromChalet.State) => {
      chaletState.chalet.map(
        (c) => {
          if(c.id == this.id.toString()) {
            ragione_sociale = c.ragione_sociale;
            telefono = c.telefono;
            codice_accesso = c.codice_accesso;
            indirizzo = c.indirizzo;
          }
        }
      )
    }).unsubscribe();


    this.chaletForm = this.fb.group({
      'ragione_sociale': [ragione_sociale, Validators.compose([ Validators.required, Validators.minLength(3) ])],
      'telefono': [telefono, Validators.compose([Validators.required, Validators.minLength(3)])],
      'codice_accesso': [codice_accesso, Validators.compose([Validators.required, Validators.minLength(6)])],
      indirizzo: this.fb.group({
        'provincia': [indirizzo.provincia, Validators.compose([Validators.required, Validators.minLength(2) ])],
        'citta': [indirizzo.citta, Validators.compose([Validators.required, Validators.minLength(2) ])],
        'via': [indirizzo.via, Validators.compose([Validators.required, Validators.minLength(2) ])],
        'civico': [indirizzo.civico, Validators.compose([ Validators.required ])]
      })
    });
    this.indirizzo = this.chaletForm.get('indirizzo') as FormGroup
  }

  showSuccessMessage(message: string) {
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.chaletForm.reset();
      this.chaletForm.markAsUntouched();
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
