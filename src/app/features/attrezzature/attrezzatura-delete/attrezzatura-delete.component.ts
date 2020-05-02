import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAttrezzatura from '../store/attrezzatura.reducers';
import * as AttrezzaturaActions from '../store/attrezzatura.actions';
import { Attrezzatura } from '../attrezzatura.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AttrezzaturaListComponent } from '../attrezzatura-list/attrezzatura-list.component';

@Component({
  selector: 'app-attrezzatura-delete',
  templateUrl: './attrezzatura-delete.component.html',
  styleUrls: ['./attrezzatura-delete.component.css']
})
export class AttrezzaturaDeleteComponent implements OnInit {
  
  attrezzatura: Attrezzatura;
  attrezzaturaState: Observable<fromAttrezzatura.State>;

  constructor(private store: Store<fromAttrezzatura.FeatureState>,
              public dialogRef: MatDialogRef<AttrezzaturaListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Attrezzatura) {
                this.attrezzatura = data;
              }

  ngOnInit() {
    this.attrezzaturaState = this.store.select('attrezzature');
  }

  close(): void {
    this.dialogRef.close();
  }

  
  delete(id): void {    
    this.store.dispatch(new AttrezzaturaActions.DeleteAttrezzatura(id));            
    this.attrezzaturaState = this.store.select('attrezzature');
    this.store.select('attrezzature').subscribe(
      (attrezzature) => {                             
        if(!(attrezzature.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Attrezzatura cancellata con successo");          
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
