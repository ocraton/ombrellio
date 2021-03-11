import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ombrelloniState from '../store/ombrelloni.state';
import * as fromApp from '../../../store/app.reducer';

import * as OmbrelloniActions from '../store/ombrelloni.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ombrellone } from '../ombrellone.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { OmbrelloniEditComponent } from '../ombrelloni-edit/ombrelloni-edit.component';
import { OmbrelloniDeleteComponent } from '../ombrelloni-delete/ombrelloni-delete.component';


@Component({
  selector: 'app-ombrelloni-list',
  templateUrl: './ombrelloni-list.component.html',
  styleUrls: ['./ombrelloni-list.component.scss']
})
export class OmbrelloniListComponent implements OnInit, OnDestroy {

  ombrelloniState: Observable<ombrelloniState.default>;
  ombrelloni: Ombrellone[] = null;
  ombrellonename: string = "";
  public currentValue: string = null;

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(OmbrelloniActions.FetchOmbrelloni());
    this.store.select('ombrelloni').subscribe(res => {
      this.ombrelloni = res.ombrelloni as Ombrellone[]
    })
    this.ombrelloniState = this.store.select('ombrelloni');
  }

  editOmbrellone(ombrellone) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = ombrellone;
    this.dialog.open(OmbrelloniEditComponent, dialogConfigDel);
  }

  deleteOmbrellone(ombrellone) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = ombrellone;
    this.dialog.open(OmbrelloniDeleteComponent, dialogConfigDel);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  setSearch(termSearch) {
    this.ombrellonename = termSearch
  }

}

