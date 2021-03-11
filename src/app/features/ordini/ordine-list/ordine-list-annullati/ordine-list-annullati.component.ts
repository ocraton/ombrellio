import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from '../../store/ordini.state';
import * as fromApp from '../../../../store/app.reducer';
import * as OrdiniActions from '../../store/ordini.actions';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { ClockService } from '../../../../shared/services/clock.service';


@Component({
  selector: 'app-ordine-list-annullati',
  templateUrl: './ordine-list-annullati.component.html',
  styleUrls: ['./ordine-list-annullati.component.scss']
})
export class OrdineListAnnullatiComponent implements OnInit, OnDestroy {

  ordineState: Observable<ordiniState.default>;
  today: string;
  visibleCounter = false;
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  searched = false;
  valueZoom: number = 100;

  constructor(private store: Store<fromApp.AppState>,
              private subService: SubscriptionService,
              private clockService: ClockService) { }

  ngOnInit() {
    this.clockService.time.subscribe((now: Date) =>
      this.today = now.toISOString()
    );
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: 'a' }));
    this.ordineState = this.store.select('ordini');
    this.ordineState.subscribe(res =>
      this.visibleCounter = (res.ordine.length > 0) ? true : false)
  }

  filterOrdine(term) {
    this.searched = true;
    this.store.dispatch(OrdiniActions.FilterOrdini({ numOmbrellone: term }));
    this.ordineState = this.store.select('ordini');
  }

  filterReset() {
    this.searchbox.nativeElement.value = '';
    this.searched = false;
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: 'a' }));
    this.ordineState = this.store.select('ordini');
  }

  formatLabel(value: number) {
    return value + '%';
  }

  updateZoom(event) {
    this.valueZoom = event.value;
  }

  getZoomVal() {
    return { zoom: this.valueZoom + '%' }
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

