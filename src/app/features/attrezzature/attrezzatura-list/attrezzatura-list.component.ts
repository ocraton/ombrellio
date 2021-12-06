import { Attrezzatura } from '../attrezzatura.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as attrezzatureState from '../store/attrezzature.state';
import * as fromApp from '../../../store/app.reducer';
import * as AttrezzatureActions from '../store/attrezzature.actions';

import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { AttrezzaturaEditComponent } from '../attrezzatura-edit/attrezzatura-edit.component';
import { AttrezzaturaDeleteComponent } from '../attrezzatura-delete/attrezzatura-delete.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-attrezzatura-list',
  templateUrl: './attrezzatura-list.component.html',
  styleUrls: ['./attrezzatura-list.component.scss']
})
export class AttrezzaturaListComponent implements OnInit {

  attrezzaturaState: Observable<attrezzatureState.default>;
  attrezzature: Attrezzatura[] = [];

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(AttrezzatureActions.FetchAttrezzature());
    this.attrezzaturaState = this.store.select('attrezzature');
    this.attrezzaturaState.subscribe(cat => this.attrezzature = cat.attrezzatura)
  }

  drop(event: CdkDragDrop<Attrezzatura[]>) {
    moveItemInArray(this.attrezzature, event.previousIndex, event.currentIndex);
    this.attrezzature.map((catItem, index) => {
      return catItem.ordinamento = index + 1
    })
    this.store.dispatch(AttrezzatureActions.UpdateAttrezzature({payload: this.attrezzature}));
  }

  editCateogoria(attrezzatura) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = attrezzatura;
    this.dialog.open(AttrezzaturaEditComponent, dialogConfigDel);
  }

  deleteCateogoria(attrezzatura) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = attrezzatura;
    this.dialog.open(AttrezzaturaDeleteComponent, dialogConfigDel);
  }

  onChangeAttrezzaturaVisibile(attrezzatura, visibile) {
    attrezzatura.visibile = visibile;
    this.store.dispatch(AttrezzatureActions.UpdateAttrezzatura({payload: attrezzatura}));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}


