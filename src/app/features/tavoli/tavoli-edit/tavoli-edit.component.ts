import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TavoliActions from '../store/tavoli.actions';
import { Tavolo } from '../tavolo.model';
import { Observable } from 'rxjs';
import * as tavoliState from '../store/tavoli.state';
import * as fromApp from '../../../store/app.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TavoliListComponent } from '../tavoli-list/tavoli-list.component';

@Component({
  selector: 'app-tavoli-edit',
  templateUrl: './tavoli-edit.component.html',
  styleUrls: ['./tavoli-edit.component.scss']
})
export class TavoliEditComponent implements OnInit {

  tavoloForm: FormGroup;
  tavolo: Tavolo;
  tavoloState: Observable<tavoliState.default>;
  @Input() lastTavolo: number;

  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TavoliListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Tavolo) {
    this.tavolo = data;
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.tavolo.numero = this.tavoloForm.get('numero').value;
    this.store.dispatch(TavoliActions.UpdateTavoli({ payload: this.tavolo }));
    this.tavoloForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let numero = this.tavolo.numero;

    this.tavoloForm = this.fb.group({
      'numero': [numero, Validators.compose([Validators.required])],
    });

  }

  close(): void {
    this.dialogRef.close();
  }


}
