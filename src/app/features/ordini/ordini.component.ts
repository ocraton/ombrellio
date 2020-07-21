import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from './store/ordini.state';
import * as fromApp from '../../store/app.reducer';
import { SubscriptionService } from '../../core/services/subscription.service';
import { ClockService } from '../../shared/services/clock.service';


@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit, OnDestroy {

  ordineState: Observable<ordiniState.default>;
  today: string;
  visibleCounter = false;

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private clockService: ClockService) { }

  ngOnInit() {
    this.clockService.time.subscribe((now: Date) =>
      this.today = now.toISOString()
    );
    this.ordineState = this.store.select('ordini')
    this.ordineState.subscribe(res =>
      this.visibleCounter = (res.ordine.length > 0) ? true : false)
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
