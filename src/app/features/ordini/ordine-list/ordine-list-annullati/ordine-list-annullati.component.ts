import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOrdine from '../../store/ordine.reducers';
import * as OrdineActions from '../../store/ordine.actions';
import { SubscriptionService } from 'src/app/core/services/subscription.service';


@Component({
  selector: 'app-ordine-list-annullati',
  templateUrl: './ordine-list-annullati.component.html',
  styleUrls: ['./ordine-list-annullati.component.css']
})
export class OrdineListAnnullatiComponent implements OnInit, OnDestroy {

  ordineState: Observable<fromOrdine.State>;
  today: Date = new Date();

  constructor(private store: Store<fromOrdine.FeatureState>,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(new OrdineActions.FetchOrdini({ orderType: 'a' }));
    this.ordineState = this.store.select('ordini');
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

