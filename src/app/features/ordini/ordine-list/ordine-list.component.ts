import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from '../store/ordini.state';
import * as fromApp from '../../../store/app.reducer';
import * as OrdiniActions from '../store/ordini.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { ClockService } from '../../../shared/services/clock.service';
import { DatesService } from 'src/app/shared/services/dates.service';


@Component({
  selector: 'app-ordine-list',
  templateUrl: './ordine-list.component.html',
  styleUrls: ['./ordine-list.component.scss']
})
export class OrdineListComponent implements OnInit, OnDestroy {

  ordineState: Observable<ordiniState.default>;
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  searched = false;
  visibleCounter = false;
  valueZoom: number = (localStorage.getItem("zoomLevelOrdini")) ? Number(localStorage.getItem("zoomLevelOrdini")) : 100;
  today: string;
  datesCompare = this.dateservice.dateBuildGMT1();

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dateservice: DatesService,
    private clockService: ClockService) { }

  ngOnInit() {
    if (localStorage.getItem("zoomLevelOrdini")) { this.valueZoom = Number(localStorage.getItem("zoomLevelOrdini")) }
    this.clockService.time.subscribe((now: Date) => {
      this.today = now.toISOString();
      let nowhourminutes = now.getHours() + now.getMinutes() + now.getSeconds();
      let dateEndOrdini = this.datesCompare.dateEnd.getHours() + this.datesCompare.dateEnd.getMinutes() + this.datesCompare.dateEnd.getSeconds();
      (nowhourminutes == dateEndOrdini) ? location.reload() : null;
    });
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: '' }));
    this.ordineState = this.store.select('ordini')
    this.ordineState.subscribe(res => this.visibleCounter = (res.ordine.length > 0) ? true : false)
  }

  filterOrdine(term) {
    this.searched = true;
    this.store.dispatch(OrdiniActions.FilterOrdini({ numOmbrellone: term }));
    this.ordineState = this.store.select('ordini');
  }

  filterReset() {
    this.searchbox.nativeElement.value = '';
    this.searched = false;
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: '' }));
    this.ordineState = this.store.select('ordini');
  }

  formatLabel(value: number) {
    return value + '%';
  }

  updateZoom(event) {
    this.valueZoom = event.value;
    localStorage.setItem("zoomLevelOrdini", this.valueZoom.toString());
  }

  getZoomVal() {
    return { zoom: this.valueZoom + '%' }
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

