import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';
import { Chalet } from '../chalet.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ChaletListComponent } from '../chalet-list/chalet-list.component';

@Component({
  selector: 'app-chalet-delete',
  templateUrl: './chalet-delete.component.html',
  styleUrls: ['./chalet-delete.component.css']
})
export class ChaletDeleteComponent implements OnInit {

  chalet: Chalet;
  chaletState: Observable<fromChalet.State>;

  constructor(private store: Store<fromChalet.FeatureState>,
              public dialogRef: MatDialogRef<ChaletListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Chalet) {
                this.chalet = data;
              }

  ngOnInit() {
    this.chaletState = this.store.select('chalets');
  }

  close(): void {
    this.dialogRef.close();
  }


  delete(chaletId) {
    this.store.dispatch(new ChaletActions.DeleteChalet(chaletId));
    this.chaletState = this.store.select('chalets');
    this.store.select('chalets').subscribe(
      (chalets) => {
        if (!(chalets.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Chalet cancellata con successo");
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
