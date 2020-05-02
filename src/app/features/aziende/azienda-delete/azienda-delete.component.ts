import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAzienda from '../store/azienda.reducers';
import * as AziendaActions from '../store/azienda.actions';
import { Azienda } from '../azienda.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AziendaListComponent } from '../azienda-list/azienda-list.component';

@Component({
  selector: 'app-azienda-delete',
  templateUrl: './azienda-delete.component.html',
  styleUrls: ['./azienda-delete.component.css']
})
export class AziendaDeleteComponent implements OnInit {

  azienda: Azienda;
  aziendaState: Observable<fromAzienda.State>;

  constructor(private store: Store<fromAzienda.FeatureState>,
              public dialogRef: MatDialogRef<AziendaListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Azienda) {
                this.azienda = data;
              }

  ngOnInit() {
    this.aziendaState = this.store.select('aziende');
  }

  close(): void {
    this.dialogRef.close();
  }


  delete(aziendaId) {
    this.store.dispatch(new AziendaActions.DeleteAzienda(aziendaId));
    this.aziendaState = this.store.select('aziende');
    this.store.select('aziende').subscribe(
      (aziende) => {
        if (!(aziende.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Azienda cancellata con successo");
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
