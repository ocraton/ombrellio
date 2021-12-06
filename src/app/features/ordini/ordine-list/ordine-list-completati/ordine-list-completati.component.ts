import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from '../../store/ordini.state';
import * as fromApp from '../../../../store/app.reducer';
import * as OrdiniActions from '../../store/ordini.actions';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { ClockService } from '../../../../shared/services/clock.service';


@Component({
  selector: 'app-ordine-list-completati',
  templateUrl: './ordine-list-completati.component.html',
  styleUrls: ['./ordine-list-completati.component.scss']
})
export class OrdineListCompletatiComponent implements OnInit, OnDestroy {

  ordineState: Observable<ordiniState.default>;
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  today: string;
  visibleCounter = false;
  searched = false;
  valueZoom: number = (localStorage.getItem("zoomLevelOrdiniCompletati")) ? Number(localStorage.getItem("zoomLevelOrdiniCompletati")) : 100;

  constructor(private store: Store<fromApp.AppState>,
              private subService: SubscriptionService,
              private clockService: ClockService) { }

  ngOnInit() {
    if (localStorage.getItem("zoomLevelOrdiniCompletati")) { this.valueZoom = Number(localStorage.getItem("zoomLevelOrdiniCompletati")) }
    this.clockService.time.subscribe((now: Date) =>
      this.today = now.toISOString()
    );
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: 'c' }));
    this.ordineState = this.store.select('ordini');
    this.ordineState.subscribe(res =>
      this.visibleCounter = (res.ordine.length > 0) ? true : false
    )
  }

  filterOrdine(term){
    this.searched = true;
    this.store.dispatch(OrdiniActions.FilterOrdini({ numOmbrellone: term}));
    this.ordineState = this.store.select('ordini');
  }

  filterReset(){
    this.searchbox.nativeElement.value = '';
    this.searched = false;
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: 'c' }));
    this.ordineState = this.store.select('ordini');
  }

  formatLabel(value: number) {
    return value + '%';
  }

  updateZoom(event) {
    this.valueZoom = event.value;
    localStorage.setItem("zoomLevelOrdiniCompletati", this.valueZoom.toString());
  }

  getZoomVal() {
    return { zoom: this.valueZoom + '%' }
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

