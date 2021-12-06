import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as attrezzatureState from '../store/attrezzature.state';
import * as fromApp from '../../../store/app.reducer';
import * as AttrezzatureActions from '../store/attrezzature.actions';
import { Attrezzatura } from '../attrezzatura.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttrezzaturaListComponent } from '../attrezzatura-list/attrezzatura-list.component';

@Component({
  selector: 'app-attrezzatura-edit',
  templateUrl: './attrezzatura-edit.component.html',
  styleUrls: ['./attrezzatura-edit.component.scss']
})
export class AttrezzaturaEditComponent implements OnInit {

  attrezzaturaForm: FormGroup;
  attrezzatura: Attrezzatura;
  attrezzaturaState: Observable<attrezzatureState.default>;
  @Input() lastAttrezzatura: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AttrezzaturaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Attrezzatura) {
                this.attrezzatura = data;
              }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.attrezzatura.nome = this.attrezzaturaForm.get('nome').value;
    this.store.dispatch(AttrezzatureActions.UpdateAttrezzatura({payload: this.attrezzatura}));
    this.attrezzaturaForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = this.attrezzatura.nome;
    this.attrezzaturaForm = this.fb.group({
      'nome': [nome, Validators.compose([ Validators.required, Validators.minLength(3) ])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

}
