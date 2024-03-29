import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import * as fromApp from '../../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Cliente } from '../../clienti/cliente.model';


@Component({
  selector: 'app-prenotazione-cliente-create',
  templateUrl: './prenotazione-cliente-create.component.html',
  styleUrls: ['./prenotazione-cliente-create.component.scss']
})
export class PrenotazioneClienteCreateComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Cliente;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.cliente = this.clienteForm.value;
    this.store.dispatch(PrenotazioniActions.CreatePrenotazioniCliente({
      payload: {
        cliente: this.cliente
      }
    }));
    this.clienteForm.markAsUntouched();
    this.store.select('prenotazioni')
      .subscribe(cliente => {
        if (!(cliente.error != null)) {
            this.showSuccessMessage("Cliente creato con successo")
        }
      }
      ).unsubscribe()
  }

  initForm() {
    this.clienteForm = this.fb.group({
      'nome': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'cognome': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.email])],
      'telefono': ['', Validators.compose([Validators.pattern('[0-9]{3,15}')])]
    });

  }

  showSuccessMessage(message: string) {

    this.formDirective.resetForm();
    this.clienteForm.reset();
    this.clienteForm.markAsUntouched();

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });

  }


}
