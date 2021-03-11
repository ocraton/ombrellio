import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  searched = false;
  valueZoom:number = 100;

  constructor(private store: Store<fromApp.AppState>,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(OrdiniActions.FetchOrdini({ orderType: '' }));
    this.ordineState = this.store.select('ordini');
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
  }

  getZoomVal(){
    return { zoom: this.valueZoom + '%' }
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

