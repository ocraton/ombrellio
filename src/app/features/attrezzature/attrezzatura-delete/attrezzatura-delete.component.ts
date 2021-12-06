import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as attrezzatureState from '../store/attrezzature.state';
import * as fromApp from '../../../store/app.reducer';
import * as AttrezzatureActions from '../store/attrezzature.actions';
import { Attrezzatura } from '../attrezzatura.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttrezzaturaListComponent } from '../attrezzatura-list/attrezzatura-list.component';

@Component({
  selector: 'app-attrezzatura-delete',
  templateUrl: './attrezzatura-delete.component.html',
  styleUrls: ['./attrezzatura-delete.component.scss']
})
export class AttrezzaturaDeleteComponent implements OnInit {

  attrezzatura: Attrezzatura;
  attrezzature: Attrezzatura[];
  attrezzaturaState: Observable<attrezzatureState.default>;
  @Input() lastAttrezzatura: number;

  constructor(private store: Store<fromApp.AppState>,
              public dialogRef: MatDialogRef<AttrezzaturaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Attrezzatura) {
                this.attrezzatura = data;
              }

  ngOnInit() {
    this.store.dispatch(AttrezzatureActions.FetchAttrezzaturaProdotti({payload: this.attrezzatura}))
    this.attrezzaturaState = this.store.select('attrezzature')
    this.attrezzaturaState.subscribe(res => this.attrezzature = res.attrezzatura)
  }

  onDelete() {
    this.store.dispatch(AttrezzatureActions.DeleteAttrezzatura({payload: this.attrezzatura}));
      this.attrezzature.map( (c, index) => {
        if (c.id == this.attrezzatura.id) {
          this.attrezzature.splice(index, 1);
          }
        }
      )
    this.attrezzature.map((catItem, index) => {
      return catItem.ordinamento = index + 1
    })
    this.store.dispatch(AttrezzatureActions.UpdateAttrezzature({payload: this.attrezzature}));
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
