import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ChaletActions from '../store/chalet.actions';
import { Chalet } from '../chalet.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as chaletState from '../store/chalet.state';
import * as fromApp from '../../../store/app.reducer';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chalet-edit',
  templateUrl: './chalet-edit.component.html',
  styleUrls: ['./chalet-edit.component.scss']
})
export class ChaletEditComponent implements OnInit {

  id: number;
  editMode = false;
  chaletForm: FormGroup;
  chalet: Chalet;
  chaletState: Observable<chaletState.default>;
  authUID: string;
  indirizzo: FormGroup;
  caOrigin:string = '';
  showAdvise = false;

  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>,
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
    this.chaletState = this.store.select('chalet');
    this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
  }


  onSave() {
    this.chalet = this.chaletForm.value;
    (this.editMode) ? this.chalet.id = this.id.toString() : this.chalet.id = null;
    this.chalet.utente_uid = this.authUID
    this.chalet.created_at = new Date()

      if (this.editMode) {
        this.showAdvise = false;
        this.store.dispatch(ChaletActions.UpdateChalet({ payload: this.chalet }))
      } else {
        this.store.dispatch(ChaletActions.CreateChalet({
          payload: {
            chalet: this.chalet
          }
        }));
      }

      this.store.select('chalet')
        .subscribe(chalet => {
          if (!(chalet.error != null)) {
            this.editMode ? this.showSuccessMessage("Chalet salvato con successo") :
              this.showSuccessMessage("Chalet creato con successo")
          }
        }
        ).unsubscribe()


  }

  initForm() {

    let ragione_sociale = '';
    let telefono = '';
    let indirizzo = {
      provincia: '',
      citta: '',
      via: '',
      civico: ''
    }
    if (this.editMode) {
      this.store.select('chalet')
      .pipe(take(1))
      .subscribe((chaletState: chaletState.default) => {
        chaletState.chalet.map(
          (c) => {
            if(c.id == this.id.toString()) {
              ragione_sociale = c.ragione_sociale;
              telefono = c.telefono;
              indirizzo = c.indirizzo;
            }
          }
        )
      }).unsubscribe();
    }


    this.chaletForm = this.fb.group({
      'ragione_sociale': [ragione_sociale, Validators.compose([ Validators.required, Validators.minLength(3) ])],
      'telefono': [telefono, Validators.compose([Validators.required, Validators.minLength(3)])],
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
      duration: 3000,
      horizontalPosition: 'end'
    });
    if (!this.editMode) {
      snackBarRef = this._snackBar.open(message, 'OK', {
        duration: 3000,
        horizontalPosition: 'end'
      });
      this.router.navigate(['/user/chalets'])
    }

  }


}
