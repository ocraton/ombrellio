import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRequisito from '../store/requisito.reducers';
import * as RequisitoActions from '../store/requisito.actions';
import { Requisito } from '../requisito.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RequisitoListComponent } from '../requisito-list/requisito-list.component';

@Component({
  selector: 'app-requisito-delete',
  templateUrl: './requisito-delete.component.html',
  styleUrls: ['./requisito-delete.component.css']
})
export class RequisitoDeleteComponent implements OnInit {
  
  requisito: Requisito;
  requisitoState: Observable<fromRequisito.State>;

  constructor(private store: Store<fromRequisito.FeatureState>,
              public dialogRef: MatDialogRef<RequisitoListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Requisito) {
                this.requisito = data;
              }

  ngOnInit() {
    this.requisitoState = this.store.select('requisiti');
  }

  close(): void {
    this.dialogRef.close();
  }

  
  delete(id): void {    
    this.store.dispatch(new RequisitoActions.DeleteRequisito(id));            
    this.requisitoState = this.store.select('requisiti');
    this.store.select('requisiti').subscribe(
      (requisiti) => {                             
        if(!(requisiti.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Requisito cancellata con successo");          
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
