import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAzienda from '../store/azienda.reducers';
import * as AziendaActions from '../store/azienda.actions';
import { Azienda } from '../azienda.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-risorseumane-edit',
  templateUrl: './azienda-edit.component.html',
  styleUrls: ['./azienda-edit.component.css']
})
export class AziendaEditComponent implements OnInit {

  id: number;
  editMode = false;
  aziendaForm: FormGroup;
  azienda: Azienda;
  aziendaState: Observable<fromAzienda.State>;
  authUID: string;
  telefono: FormArray;
  indirizzo: FormGroup;

  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromAzienda.FeatureState>,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private storeAzienda: Store<fromAzienda.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.aziendaState = this.store.select('aziende');
    this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
  }


  onSave() {
    this.azienda = this.aziendaForm.value
    this.azienda.uid_utente = this.authUID
    this.azienda.created_at = new Date()
    if (this.editMode) {
      this.store.dispatch(new AziendaActions.UpdateAzienda({
        index: this.id,
        updateAzienda: this.azienda
      }));
    } else {
      this.store.dispatch(new AziendaActions.CreateAzienda(this.azienda));
    }
    this.store.select('aziende').subscribe(
      (azienda) => {
        if(!(azienda.error != null)) {
          this.editMode ? this.showSuccessMessage("Azienda salvata con successo") :
                          this.showSuccessMessage("Azienda creata con successo")
        }
      }
    ).unsubscribe()
  }

  initForm() {

    // if (this.editMode) {
    //   this.store.select('aziende')
    //   .pipe(take(1))
    //   .subscribe((aziendaState: fromAzienda.State) => {
    //     aziendaState.azienda.map(
    //       (c) => {
    //         if(c.id == this.id.toString()) {
    //           aziendaId = c.id;
    //           ragione_sociale = c.ragione_sociale;
    //           email = c.email;
    //         }
    //       }
    //     )
    //   });
    // }

    this.aziendaForm = this.fb.group({
      'ragione_sociale': ['', Validators.compose([ Validators.required, Validators.minLength(3) ])],
      'email': ['', Validators.compose([ Validators.required, Validators.email ])],
      'pec': ['', Validators.compose([ Validators.required, Validators.email ])],
      'partita_iva': ['', Validators.compose([ Validators.required, Validators.pattern('^[0-9]{11}$') ])],
      'numero_rea': ['', Validators.compose([ Validators.required, Validators.pattern('^[0-9]{6}$')])],
      'codice_ateco': ['', Validators.compose([Validators.required, Validators.pattern('^\\d{2}[.]{1}\\d{2}[.]{1}[0-9A-Za-z]{1}$')])],
      'data_visura_evasione_ccia': [new Date(''), Validators.compose([Validators.required])],
      indirizzo: this.fb.group({
        'nazione': ['', Validators.compose([Validators.required, Validators.minLength(3) ])],
        'provincia': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'citta': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'via': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'civico': ['', Validators.compose([ Validators.required ])]
      }),
      telefono: this.fb.array([this.createTelefono()], Validators.minLength(1)) as AbstractControl
    });
    this.indirizzo = this.aziendaForm.get('indirizzo') as FormGroup
    this.telefono = this.aziendaForm.get('telefono') as FormArray
  }

  createTelefono(): FormGroup {
    return this.fb.group({
      numero: new FormControl('', [Validators.required]),
      prefisso: new FormControl('+39'),
      nota: new FormControl('Azienda Telefono', [Validators.required, Validators.maxLength(20)])
    })
  }
  addTelefono() { this.telefono.push(this.createTelefono()); }
  removeTelefono(item) {
    const index = this.telefono.controls.indexOf(item)
    this.telefono.removeAt(index)
  }


  showSuccessMessage(message: string) {
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.aziendaForm.reset();
      this.aziendaForm.markAsUntouched();
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
