import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ClientiActions from '../store/clienti.actions';
import { Cliente } from '../cliente.model';
import { Observable } from 'rxjs';
import * as clientiState from '../store/clienti.state';
import * as fromApp from '../../../store/app.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientiListComponent } from '../clienti-list/clienti-list.component';

@Component({
  selector: 'app-clienti-edit',
  templateUrl: './clienti-edit.component.html',
  styleUrls: ['./clienti-edit.component.scss']
})
export class ClientiEditComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Cliente;
  clienteState: Observable<clientiState.default>;
  @Input() lastCliente: number;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientiListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Cliente) {
    this.cliente = data;
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.cliente.nome = this.clienteForm.get('nome').value;
    this.cliente.cognome = this.clienteForm.get('cognome').value;
    this.cliente.email = this.clienteForm.get('email').value;
    this.cliente.telefono = this.clienteForm.get('telefono').value;
    this.store.dispatch(ClientiActions.UpdateClienti({ payload: this.cliente }));
    this.clienteForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    this.clienteForm = this.fb.group({
      'nome': [this.cliente.nome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'cognome': [this.cliente.cognome, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [this.cliente.email, Validators.compose([Validators.required, Validators.email])],
      'telefono': [this.cliente.telefono, Validators.compose([Validators.required, Validators.pattern('[0-9]{3,15}')])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }


}
