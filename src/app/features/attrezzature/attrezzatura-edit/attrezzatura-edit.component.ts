import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAttrezzatura from '../store/attrezzatura.reducers';
import * as AttrezzaturaActions from '../store/attrezzatura.actions';
import { Attrezzatura } from '../attrezzatura.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';


@Component({
  selector: 'app-attrezzatura-edit',
  templateUrl: './attrezzatura-edit.component.html',
  styleUrls: ['./attrezzatura-edit.component.css']
})
export class AttrezzaturaEditComponent implements OnInit {

  id: number;
  editMode = false;
  attrezzaturaForm: FormGroup;
  attrezzatura: Attrezzatura;
  attrezzaturaState: Observable<fromAttrezzatura.State>;
  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromAttrezzatura.FeatureState>,
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
    this.attrezzaturaState = this.store.select('attrezzature');
  }


  onSave() {     
    this.attrezzatura = this.attrezzaturaForm.value                   
    if (this.editMode) {
      this.store.dispatch(new AttrezzaturaActions.UpdateAttrezzatura({
        index: this.id,
        updateAttrezzatura: this.attrezzatura
      }));      
    } else {                       
      this.store.dispatch(new AttrezzaturaActions.CreateAttrezzatura(this.attrezzatura));      
    }
    this.store.select('attrezzature').subscribe(
      (attrezzature) => {                             
        if(!(attrezzature.error != null)) {
          this.editMode ? this.showSuccessMessage("Attrezzatura salvata con successo") : 
                          this.showSuccessMessage("Attrezzatura creata con successo")
        }                
      }
    ).unsubscribe()
  }

  initForm() {

    let denominazione = '';
    
    if (this.editMode) { 
      this.store.select('attrezzature')
      .pipe(take(1))
      .subscribe((attrezzaturaState: fromAttrezzatura.State) => {
        attrezzaturaState.attrezzature.data.map(
          (c) => {            
            if(c.id == this.id.toString()) {        
              denominazione = c.denominazione;             
            }
          }
        )                
      });
    }

    this.attrezzaturaForm = new FormGroup({
      'denominazione': new FormControl(denominazione, Validators.required)     
    });
  }

  showSuccessMessage(message: string) {  
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.attrezzaturaForm.reset();
      this.attrezzaturaForm.markAsUntouched(); 
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
