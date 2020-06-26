import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';

import { Router } from '@angular/router';
import { Chalet } from '../chalet.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-chalet-list',
  templateUrl: './chalet-list.component.html',
  styleUrls: ['./chalet-list.component.css']
})
export class ChaletListComponent implements OnInit, OnDestroy {

  chaletState: Observable<fromChalet.State>;
  chalet: Chalet = null;

  constructor(private store: Store<fromChalet.FeatureState>,
              private router: Router,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(new ChaletActions.FetchChalets);
    this.chaletState = this.store.select('chalets');
  }

  editChalet(element) {
    this.router.navigate(['/user/chalets/' + element.id + '/edit']);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

