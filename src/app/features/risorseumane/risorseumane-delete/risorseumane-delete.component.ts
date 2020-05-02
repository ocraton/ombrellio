import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRisorsaumana from '../store/risorsaumana.reducers';
import * as risorsaumanaActions from '../store/risorsaumana.actions';
import { Risorsaumana } from '../risorsaumana.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RisorseumaneListComponent } from '../risorseumane-list/risorseumane-list.component';

@Component({
  selector: 'app-risorseumane-delete',
  templateUrl: './risorseumane-delete.component.html',
  styleUrls: ['./risorseumane-delete.component.css']
})
export class RisorseumaneDeleteComponent implements OnInit {

  risorsaumana: Risorsaumana;
  risorsaumanaState: Observable<fromRisorsaumana.State>;

  constructor(private store: Store<fromRisorsaumana.FeatureState>,
              public dialogRef: MatDialogRef<RisorseumaneListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Risorsaumana) {
                this.risorsaumana = data;
              }

  ngOnInit() {
    this.risorsaumanaState = this.store.select('risorseumane');
  }

  close(): void {
    this.dialogRef.close();
  }

  
  delete(id): void {    
    this.store.dispatch(new risorsaumanaActions.DeleteRisorsaumana(id));            
    this.risorsaumanaState = this.store.select('risorseumane');
    this.store.select('risorseumane').subscribe(
      (clienti) => {                             
        if(!(clienti.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Risorsaumana cancellato con successo");          
        }                
      }
    ).unsubscribe()
  }

  showSuccessMessage(message: string) {  
 
    this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

  }

}
