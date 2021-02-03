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
  hidep = true;
  hidecp = true;
  registered = false;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    delete this.utenteForm.value['password_confirm'];
    this.utente = this.utenteForm.value;
    this.utente.chalet_uid = '';
    this.utente.userType = 'demo';
    this.utente.data_rinnovo = new Date();
    this.utente.data_scadenza = new Date(2021, 11, 31); //scadenza impostata al 31 dicembre 2021
    if (this.utenteForm.valid){
      this.store.dispatch(UtentiActions.CreateUtente({ payload: { utente: this.utente } }));
      this.store.select('utenti')
        .subscribe(utente => {
          if (!(utente.error != null)) {
            this.showSuccessMessage()
          }
        }).unsubscribe()
    }
  }

  initForm() {
    let nome = '';
    let cognome = '';
    let email = '';
    let password = '';
    let password_confirm = '';
    let telefono = '';
    this.utenteForm = this.fb.group({
      'nome': [nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'cognome': [cognome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [email, Validators.compose([Validators.required, Validators.email])],
      'password': [password, Validators.compose([Validators.required, Validators.minLength(8)])],
      'password_confirm': [password_confirm, Validators.compose([Validators.required, Validators.minLength(8)])],
      'telefono': [telefono, Validators.compose([Validators.required, Validators.pattern('[0-9]{3,15}')])]
    }, {
        validator: this.confirmPasswordMatch('password', 'password_confirm')
    });

  }

  showSuccessMessage() {

    this.formDirective.resetForm();
    this.utenteForm.reset();

    this.registered = true;

  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
