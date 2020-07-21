import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from '../store/ordini.state';
import * as fromApp from '../../../store/app.reducer';
import * as OrdiniActions from '../store/ordini.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';


@Component({
  selector: 'app-ordine-list',
  templateUrl: './ordine-list.component.html',
  styleUrls: ['./ordine-list.component.scss']
})
export class OrdineListComponent implements OnInit, OnDestroy {

  ordineState: Observable<ordiniState.default>;

  constructor(private store: Store<fromApp.AppState>,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: '' }));
    this.ordineState = this.store.select('ordini');
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

