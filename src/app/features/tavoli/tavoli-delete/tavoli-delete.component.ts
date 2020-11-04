import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as tavoliState from '../store/tavoli.state';
import * as fromApp from '../../../store/app.reducer';
import * as TavoliActions from '../store/tavoli.actions';
import { Tavolo } from '../tavolo.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TavoliListComponent } from '../tavoli-list/tavoli-list.component';

@Component({
  selector: 'app-tavoli-delete',
  templateUrl: './tavoli-delete.component.html',
  styleUrls: ['./tavoli-delete.component.scss']
})
export class TavoliDeleteComponent implements OnInit {

  tavolo: Tavolo;
  tavoli: Tavolo[];
  tavoliState: Observable<tavoliState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<TavoliListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Tavolo) {
    this.tavolo = data;
  }

  ngOnInit() {
    // this.store.dispatch(new TavoloActions.FetchTavoliByCategoria(this.tavoli.categoria_uid))
    this.tavoliState = this.store.select('tavoli')
    this.tavoliState.subscribe(res => this.tavoli = res.tavoli)
  }

  onDelete() {
    this.store.dispatch(TavoliActions.DeleteTavolo({payload: this.tavolo}));
    this.tavoli.map((c, index) => {
      if (c.id == this.tavolo.id) {
        this.tavoli.splice(index, 1);
      }
    }
    )
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
