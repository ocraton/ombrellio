import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMansione from '../store/mansione.reducers';
import * as MansioneActions from '../store/mansione.actions';
import { Mansione } from '../mansione.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MansioneListComponent } from '../mansione-list/mansione-list.component';

@Component({
  selector: 'app-mansione-delete',
  templateUrl: './mansione-delete.component.html',
  styleUrls: ['./mansione-delete.component.css']
})
export class MansioneDeleteComponent implements OnInit {
  
  mansione: Mansione;
  mansioneState: Observable<fromMansione.State>;

  constructor(private store: Store<fromMansione.FeatureState>,
              public dialogRef: MatDialogRef<MansioneListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Mansione) {
                this.mansione = data;
              }

  ngOnInit() {
    this.mansioneState = this.store.select('mansioni');
  }

  close(): void {
    this.dialogRef.close();
  }

  
  delete(id): void {    
    this.store.dispatch(new MansioneActions.DeleteMansione(id));            
    this.mansioneState = this.store.select('mansioni');
    this.store.select('mansioni').subscribe(
      (mansioni) => {                             
        if(!(mansioni.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Mansione cancellata con successo");          
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
