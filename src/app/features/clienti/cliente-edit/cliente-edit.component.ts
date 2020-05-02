import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCliente from '../store/cliente.reducers';
import * as ClienteActions from '../store/cliente.actions';
import { Cliente } from '../cliente.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';


@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  id: number;
  editMode = false;
  clienteForm: FormGroup;
  cliente: Cliente;
  clienteState: Observable<fromCliente.State>;
  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromCliente.FeatureState>,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.clienteState = this.store.select('clienti');
  }


  onSave() {     
    this.cliente = this.clienteForm.value   
    let datestring = moment(this.cliente.data_nascita).format('YYYY-MM-DD');
    this.cliente.data_nascita = datestring;                 
    if (this.editMode) {
      this.store.dispatch(new ClienteActions.UpdateCliente({
        index: this.id,
        updateCliente: this.cliente
      }));      
    } else {                       
      this.store.dispatch(new ClienteActions.CreateCliente(this.cliente));      
    }
    this.store.select('clienti').subscribe(
      (clienti) => {                             
        if(!(clienti.error != null)) {
          this.editMode ? this.showSuccessMessage("Cliente salvato con successo") : 
                          this.showSuccessMessage("Cliente creato con successo")
        }                
      }
    ).unsubscribe()
  }

  initForm() {

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
      this.store.select('clienti')
      .pipe(take(1))
      .subscribe((clienteState: fromCliente.State) => {
        clienteState.clienti.data.map(
          (c) => {            
            if(c.id == this.id.toString()) {        
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

    this.clienteForm = new FormGroup({
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
      this.clienteForm.reset();
      this.clienteForm.markAsUntouched(); 
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
