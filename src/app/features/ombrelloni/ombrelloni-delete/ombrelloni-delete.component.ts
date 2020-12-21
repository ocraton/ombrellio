import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ombrelloniState from '../store/ombrelloni.state';
import * as fromApp from '../../../store/app.reducer';
import * as OmbrelloniActions from '../store/ombrelloni.actions';
import { Ombrellone } from '../ombrellone.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OmbrelloniListComponent } from '../ombrelloni-list/ombrelloni-list.component';

@Component({
  selector: 'app-ombrelloni-delete',
  templateUrl: './ombrelloni-delete.component.html',
  styleUrls: ['./ombrelloni-delete.component.scss']
})
export class OmbrelloniDeleteComponent implements OnInit {

  ombrellone: Ombrellone;
  ombrelloni: Ombrellone[];
  ombrelloniState: Observable<ombrelloniState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OmbrelloniListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Ombrellone) {
    this.ombrellone = data;
  }

  ngOnInit() {
    this.ombrelloniState = this.store.select('ombrelloni')
    this.ombrelloniState.subscribe(res => this.ombrelloni = res.ombrelloni)
  }

  onDelete() {
    this.store.dispatch(OmbrelloniActions.DeleteOmbrellone({payload: this.ombrellone}));
    this.ombrelloni.map((c, index) => {
      if (c.id == this.ombrellone.id) {
        this.ombrelloni.splice(index, 1);
      }
    })
    this.dialogRef.close();
    this.showSuccessMessage(`Ombrellone ${this.ombrellone.numero} cancellato!`)
  }

  close(): void {
    this.dialogRef.close();
  }

  showSuccessMessage(message: string) {

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });

  }

}
