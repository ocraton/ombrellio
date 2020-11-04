import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TavoliActions from '../store/tavoli.actions';
import { Tavolo } from '../tavolo.model';
import { Observable } from 'rxjs';
import * as tavoliState from '../store/tavoli.state';
import * as fromApp from '../../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tavoli-edit',
  templateUrl: './tavoli-create.component.html',
  styleUrls: ['./tavoli-create.component.scss']
})
export class TavoliCreateComponent implements OnInit {

  tavoloForm: FormGroup;
  tavolo: Tavolo;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.tavolo = this.tavoloForm.value;
    this.store.dispatch(TavoliActions.CreateTavolo({
      payload: {
        tavolo: this.tavolo
      }
    }));
    this.tavoloForm.markAsUntouched();
    this.store.select('tavoli')
      .subscribe(tavolo => {
        if (!(tavolo.error != null)) {
            this.showSuccessMessage("Tavolo creato con successo")
        }
      }
      ).unsubscribe()
  }

  initForm() {
    let numero = '';
    this.tavoloForm = this.fb.group({
      'numero': [numero, Validators.compose([Validators.required])]
    });

  }

  showSuccessMessage(message: string) {

    this.formDirective.resetForm();
    this.tavoloForm.reset();
    this.tavoloForm.markAsUntouched();

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });
    this.router.navigate(['/user/tavoli']);


  }


}
