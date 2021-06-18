import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as OmbrelloniActions from '../store/ombrelloni.actions';
import { Ombrellone } from '../ombrellone.model';
import * as fromApp from '../../../store/app.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OmbrelloniListComponent } from '../ombrelloni-list/ombrelloni-list.component';


@Component({
  selector: 'app-ombrelloni-edit',
  templateUrl: './ombrelloni-create.component.html',
  styleUrls: ['./ombrelloni-create.component.scss']
})
export class OmbrelloniCreateComponent implements OnInit {

  ombrelloneForm: FormGroup;
  ombrellone: Ombrellone;
  iRiga: number;
  iColonna: number;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OmbrelloniListComponent>,
              @Inject(MAT_DIALOG_DATA) data: {iRiga,iColonna}) {
                    this.iRiga = data.iRiga;
                    this.iColonna = data.iColonna;
            }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.ombrellone = this.ombrelloneForm.value;
    this.ombrellone.riga = this.iRiga;
    this.ombrellone.colonna = this.iColonna;
    this.store.dispatch(OmbrelloniActions.CreateOmbrellone({
      payload: {
        ombrellone: this.ombrellone
      }
    }));
    this.ombrelloneForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let numero = '';
    this.ombrelloneForm = this.fb.group({
      'numero': [numero, Validators.compose([Validators.required, Validators.maxLength(3)])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }


}
