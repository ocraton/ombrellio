import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOrdine from '../../store/ordine.reducers';
import * as OrdineActions from '../../store/ordine.actions';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ClockService } from 'src/app/shared/services/clock.service';


@Component({
  selector: 'app-ordine-list-completati',
  templateUrl: './ordine-list-completati.component.html',
  styleUrls: ['./ordine-list-completati.component.css']
})
export class OrdineListCompletatiComponent implements OnInit, OnDestroy {

  ordineState: Observable<fromOrdine.State>;
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  today: string;
  visibleCounter = false;
  searched = false;

  constructor(private store: Store<fromOrdine.FeatureState>,
              private subService: SubscriptionService,
              private clockService: ClockService) { }

  ngOnInit() {
    this.clockService.time.subscribe((now: Date) =>
      this.today = now.toISOString()
    );
    this.store.dispatch(new OrdineActions.FetchOrdini({ orderType: 'c' }));
    this.ordineState = this.store.select('ordini');
    this.ordineState.subscribe(res =>
      this.visibleCounter = (res.ordine.length > 0) ? true : false)
  }

  filterOrdine(term){
    this.searched = true;
    this.store.dispatch(new OrdineActions.FilterOrdini(term));
    this.ordineState = this.store.select('ordini');
  }

  filterReset(){
    this.searchbox.nativeElement.value = '';
    this.searched = false;
    this.store.dispatch(new OrdineActions.FetchOrdini({ orderType: 'c' }));
    this.ordineState = this.store.select('ordini');
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

