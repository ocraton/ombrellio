import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ClientiActions from '../store/clienti.actions';
import { Cliente } from '../cliente.model';
import * as fromApp from '../../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clienti-create',
  templateUrl: './clienti-create.component.html',
  styleUrls: ['./clienti-create.component.scss']
})
export class ClientiCreateComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Cliente;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.cliente = this.clienteForm.value;
    this.store.dispatch(ClientiActions.CreateCliente({
      payload: {
        cliente: this.cliente
      }
    }));
    this.clienteForm.markAsUntouched();
    this.store.select('clienti')
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
    this.router.navigate(['/user/clienti']);


  }


}
