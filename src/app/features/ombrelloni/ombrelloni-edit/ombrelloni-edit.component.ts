import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as OmbrelloniActions from '../store/ombrelloni.actions';
import { Ombrellone } from '../ombrellone.model';
import { Observable } from 'rxjs';
import * as ombrelloniState from '../store/ombrelloni.state';
import * as fromApp from '../../../store/app.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OmbrelloniListComponent } from '../ombrelloni-list/ombrelloni-list.component';

@Component({
  selector: 'app-ombrelloni-edit',
  templateUrl: './ombrelloni-edit.component.html',
  styleUrls: ['./ombrelloni-edit.component.scss']
})
export class OmbrelloniEditComponent implements OnInit {

  ombrelloneForm: FormGroup;
  ombrellone: Ombrellone;
  ombrelloneState: Observable<ombrelloniState.default>;
  @Input() lastOmbrellone: number;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OmbrelloniListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Ombrellone) {
    this.ombrellone = data;
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.ombrellone.numero = this.ombrelloneForm.get('numero').value;
    this.store.dispatch(OmbrelloniActions.UpdateOmbrelloni({ payload: this.ombrellone }));
    this.ombrelloneForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let numero = this.ombrellone.numero;

    this.ombrelloneForm = this.fb.group({
      'numero': [numero, Validators.compose([Validators.required])],
    });

  }

  close(): void {
    this.dialogRef.close();
  }


}
