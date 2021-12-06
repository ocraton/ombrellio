import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as attrezzatureState from '../store/attrezzature.state';
import * as fromApp from '../../../store/app.reducer';
import * as AttrezzatureActions from '../store/attrezzature.actions';
import { Attrezzatura } from '../attrezzatura.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-attrezzatura-add',
  templateUrl: './attrezzatura-add.component.html',
  styleUrls: ['./attrezzatura-add.component.scss']
})
export class AttrezzaturaAddComponent implements OnInit {

  attrezzaturaForm: FormGroup;
  attrezzatura: Attrezzatura;
  attrezzaturaState: Observable<attrezzatureState.default>;
  @Input() lastAttrezzatura: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.attrezzaturaState = this.store.select('attrezzature');
  }

  onSave() {
    this.attrezzatura = this.attrezzaturaForm.value;
    this.attrezzatura.ordinamento = this.lastAttrezzatura+1;
    this.attrezzatura.visibile = true;
    this.store.dispatch(AttrezzatureActions.CreateAttrezzatura({payload: this.attrezzatura}));
    this.formDirective.resetForm();
    this.attrezzaturaForm.reset();
    this.attrezzaturaForm.markAsUntouched();
  }

  initForm() {
    let nome = '';
    this.attrezzaturaForm = this.fb.group({
      'nome': [nome, Validators.compose([ Validators.required, Validators.minLength(3) ])]
    });

  }


}
