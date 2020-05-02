import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromMansione from '../store/mansione.reducers';
import * as MansioneActions from '../store/mansione.actions';
import { Mansione } from '../mansione.model';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import * as fromRequisito from '../../requisiti/store/requisito.reducers';
import * as RequisitoActions from '../../requisiti/store/requisito.actions';
import { Requisito } from '../../requisiti/requisito.model';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';

export  interface maprequisitosubmit {
  indice: number;
  requisitoId: string;
  initCheck: boolean;
  requisitoDenominazione: string;
}

@Component({
  selector: 'app-mansione-edit',
  templateUrl: './mansione-edit.component.html',
  styleUrls: ['./mansione-edit.component.css']
})
export class MansioneEditComponent implements OnInit {

  id: number;
  editMode = false;
  mansioneForm: FormGroup;
  mansione: Mansione;
  mansioneState: Observable<fromMansione.State>;  
  requisitoState: Observable<fromRequisito.State>;
  requisiti: Requisito[];
  requisitiMansione = [];
  requisitiStateSubmit = [];
  maprequisitisubmit = [];

  @ViewChild('formDirective') formDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storeMansione: Store<fromMansione.FeatureState>,
              private storeRequisito: Store<fromRequisito.FeatureState>,
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
  }


  onSave() { 
        
    this.mansione.denominazione = this.mansioneForm.value.denominazione;    
    this.mansione.descrizione = this.mansioneForm.value.descrizione;    
    this.mansione.requisiti.splice(0, this.mansione.requisiti.length);
    this.mansioneForm.value.requisitiall.map((requisito, i) => {
        if(requisito){
          let found = this.maprequisitisubmit.find(function(el) {
            return el.indice == i;
          });          
          this.mansione.requisiti.push({
            id: found.requisitoId, 
            denominazione: found.requisitoDenominazione,              
            descrizione: ''
          });          
        }          
    })
    
    if (this.editMode) {      
      this.storeMansione.dispatch(new MansioneActions.UpdateMansione({
        index: this.id,
        updateMansione: this.mansione
      }));      
    } else {                       
      // this.storeMansione.dispatch(new MansioneActions.CreateMansione(this.mansione));      
    }
    this.storeMansione.select('mansioni').subscribe(
      (mansioni) => {                             
        if(!(mansioni.error != null)) {
          this.editMode ? this.showSuccessMessage("Mansione salvata con successo") : 
                          this.showSuccessMessage("Mansione creata con successo")
        }                
      }
    ).unsubscribe()
  }

  initForm() {
     
    this.storeRequisito.dispatch(new RequisitoActions.FetchRequisiti({ search: '', page: '0' }));
    this.storeRequisito.select('requisiti')
    .subscribe((requisitoState: fromRequisito.State) => {   
      
      let denominazione = '';
      let descrizione = '';  

      this.requisiti = requisitoState.requisiti.data;
      this.storeMansione.dispatch(new MansioneActions.FetchMansione({ id_mansione: this.id}));      
      this.mansioneState = this.storeMansione.select('mansioni');
  
      if(this.editMode) {       
  
        this.mansioneState.subscribe((mansioneState: fromMansione.State) => {
  
          if(mansioneState.mansione.denominazione && this.requisiti){
  
            this.mansione = mansioneState.mansione;          
  
            denominazione = this.mansione.denominazione;
            descrizione = this.mansione.descrizione;
            this.requisitiMansione = this.mansione.requisiti; 
            
            this.mansioneForm = new FormGroup({
                denominazione: new FormControl(denominazione, Validators.required),
                descrizione: new FormControl(descrizione, Validators.required),
                requisitiall: this.createRequisiti() 
            });            
          }
                  
        });
  
      }
      
      if(this.requisiti){
        this.mansioneForm = new FormGroup({
          denominazione: new FormControl(denominazione, Validators.required),
          descrizione: new FormControl(descrizione, Validators.required),
          requisitiall: this.createRequisiti()        
        });
      }
      
    });  

    

  }

  createRequisiti() {  
      const arr = this.requisiti.map((requisito, i) => {  
        let maprequisitosubmit_obj: maprequisitosubmit = {
          indice: i,
          requisitoId: requisito.id,
          initCheck: this.isInArrayRequisiti(requisito.id),
          requisitoDenominazione: requisito.denominazione
        }        
        this.maprequisitisubmit.push(maprequisitosubmit_obj);        
        return new FormControl(this.isInArrayRequisiti(requisito.id));
    });   
    
    return new FormArray(arr);
  }

  isInArrayRequisiti(id) {          
    const checkId = obj => obj.id === id;    
    return this.requisitiMansione.some(checkId);
  }

  showSuccessMessage(message: string) {  
    if(!this.editMode) {
      this.formDirective.resetForm();
      this.mansioneForm.reset();
      this.mansioneForm.markAsUntouched(); 
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
