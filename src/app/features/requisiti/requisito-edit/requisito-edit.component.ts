import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCliente from '../store/requisito.reducers';
import * as ClienteActions from '../store/requisito.actions';
import { Requisito } from '../requisito.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';


@Component({
  selector: 'app-requisito-edit',
  templateUrl: './requisito-edit.component.html',
  styleUrls: ['./requisito-edit.component.css']
})
export class RequisitoEditComponent implements OnInit {

  id: number;
  editMode = false;
  requisitoForm: FormGroup;
  requisito: Requisito;
  requisitoState: Observable<fromCliente.State>;
  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromCliente.FeatureState>,
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
    this.requisitoState = this.store.select('requisiti');
  }


  onSave() {     
    this.requisito = this.requisitoForm.value                   
    if (this.editMode) {
      this.store.dispatch(new ClienteActions.UpdateRequisito({
        index: this.id,
        updateRequisito: this.requisito
      }));      
    } else {                       
      this.store.dispatch(new ClienteActions.CreateRequisito(this.requisito));      
    }
    this.store.select('requisiti').subscribe(
      (requisiti) => {                             
        if(!(requisiti.error != null)) {
          this.editMode ? this.showSuccessMessage("Requisito salvata con successo") : 
                          this.showSuccessMessage("Requisito creata con successo")
        }                
      }
    ).unsubscribe()
  }

  initForm() {

    let denominazione = '';
    let descrizione = '';
    
    if (this.editMode) { 
      this.store.select('requisiti')
      .pipe(take(1))
      .subscribe((requisitoState: fromCliente.State) => {
        requisitoState.requisiti.data.map(
          (c) => {            
            if(c.id == this.id.toString()) {        
              denominazione = c.denominazione;
              descrizione = c.descrizione;              
            }descrizione
          }
        )                
      });
    }

    this.requisitoForm = new FormGroup({
      'denominazione': new FormControl(denominazione, Validators.required),
      'descrizione': new FormControl(descrizione, Validators.required),     
    });
  }

  showSuccessMessage(message: string) {  
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.requisitoForm.reset();
      this.requisitoForm.markAsUntouched(); 
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
