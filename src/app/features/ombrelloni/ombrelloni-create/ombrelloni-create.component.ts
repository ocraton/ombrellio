import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as OmbrelloniActions from '../store/ombrelloni.actions';
import { Ombrellone } from '../ombrellone.model';
import * as fromApp from '../../../store/app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ombrelloni-edit',
  templateUrl: './ombrelloni-create.component.html',
  styleUrls: ['./ombrelloni-create.component.scss']
})
export class OmbrelloniCreateComponent implements OnInit {

  ombrelloneForm: FormGroup;
  ombrellone: Ombrellone;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.ombrellone = this.ombrelloneForm.value;
    this.store.dispatch(OmbrelloniActions.CreateOmbrellone({
      payload: {
        ombrellone: this.ombrellone
      }
    }));
    this.ombrelloneForm.markAsUntouched();
    this.store.select('ombrelloni')
      .subscribe(ombrellone => {
        if (!(ombrellone.error != null)) {
            this.showSuccessMessage("Ombrellone creato con successo")
        }
      }
      ).unsubscribe()
  }

  initForm() {
    let numero = '';
    this.ombrelloneForm = this.fb.group({
      'numero': [numero, Validators.compose([Validators.required])]
    });

  }

  showSuccessMessage(message: string) {

    this.formDirective.resetForm();
    this.ombrelloneForm.reset();
    this.ombrelloneForm.markAsUntouched();

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });
    this.router.navigate(['/user/ombrelloni']);


  }


}
