import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UtentiActions from '../store/utenti.actions';
import { Utente } from '../utente.model';
import { Observable } from 'rxjs';
import * as utentiState from '../store/utenti.state';
import * as fromApp from '../../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-utenti-edit',
  templateUrl: './utenti-create.component.html',
  styleUrls: ['./utenti-create.component.scss']
})
export class UtentiCreateComponent implements OnInit {

  utenteForm: FormGroup;
  utente: Utente;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.utente = this.utenteForm.value;
    this.utente.chalet_uid = "";
    if (this.utenteForm.valid){
      this.store.dispatch(UtentiActions.CreateUtente({
        payload: {
          utente: this.utente
        }
      }));
      this.store.select('utenti')
        .subscribe(utente => {
          if (!(utente.error != null)) {
            this.showSuccessMessage("Utente creato con successo")
          }
        }
        ).unsubscribe()
    }
  }

  initForm() {
    let nome = '';
    let cognome = '';
    let email = '';
    let password = '';
    let telefono = '';
    this.utenteForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'cognome': [cognome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [email, Validators.compose([Validators.required, Validators.email])],
      'password': [password, Validators.compose([Validators.required, Validators.minLength(6)])],
      'telefono': [telefono, Validators.compose([Validators.required, Validators.pattern('[0-9]{3,15}')])]
    });

  }

  showSuccessMessage(message: string) {

    this.formDirective.resetForm();
    this.utenteForm.reset();

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });
    // this.router.navigate(['/user/utenti']);


  }


}
