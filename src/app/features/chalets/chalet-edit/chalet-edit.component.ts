import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';
import { Chalet } from '../chalet.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-risorseumane-edit',
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
              private fb: FormBuilder,
              private storeChalet: Store<fromChalet.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.chaletState = this.store.select('chalets');
    this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
  }


  onSave() {
    this.chalet = this.chaletForm.value
    this.chalet.utente_uid = this.authUID
    this.chalet.created_at = new Date()
    if (this.editMode) {
      this.store.dispatch(new ChaletActions.UpdateChalet({
        index: this.id,
        updateChalet: this.chalet
      }));
    } else {
      this.store.dispatch(new ChaletActions.CreateChalet(this.chalet));
    }
    this.store.select('chalets').subscribe(
      (chalet) => {
        if(!(chalet.error != null)) {
          this.editMode ? this.showSuccessMessage("Chalet salvata con successo") :
                          this.showSuccessMessage("Chalet creata con successo")
        }
      }
    ).unsubscribe()
  }

  initForm() {

    // if (this.editMode) {
    //   this.store.select('chalets')
    //   .pipe(take(1))
    //   .subscribe((chaletState: fromChalet.State) => {
    //     chaletState.chalet.map(
    //       (c) => {
    //         if(c.id == this.id.toString()) {
    //           chaletId = c.id;
    //           ragione_sociale = c.ragione_sociale;
    //           email = c.email;
    //         }
    //       }
    //     )
    //   });
    // }

    this.chaletForm = this.fb.group({
      'ragione_sociale': ['', Validators.compose([ Validators.required, Validators.minLength(3) ])],
      'telefono': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'codice_accesso': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      indirizzo: this.fb.group({
        'provincia': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'citta': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'via': ['', Validators.compose([Validators.required, Validators.minLength(2) ])],
        'civico': ['', Validators.compose([ Validators.required ])]
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
