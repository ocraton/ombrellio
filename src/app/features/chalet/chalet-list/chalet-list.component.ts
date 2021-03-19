import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as chaletState from '../store/chalet.state';
import * as fromApp from '../../../store/app.reducer';

import * as ChaletActions from '../store/chalet.actions';

import { Router } from '@angular/router';
import { Chalet } from '../chalet.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import * as AuthActions from '../../login/store/auth.actions';

@Component({
  selector: 'app-chalet-list',
  templateUrl: './chalet-list.component.html',
  styleUrls: ['./chalet-list.component.scss']
})
export class ChaletListComponent implements OnInit, OnDestroy {

  chaletState: Observable<chaletState.default>;
  chalet: Chalet = null;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private subService: SubscriptionService) { }

  ngOnInit(): void {
    this.store.dispatch(ChaletActions.FetchChalets());
    this.store.select('chalet').subscribe(res => {
      if(res.chalet.length > 0)
      this.store.dispatch(AuthActions.SetChaletUID({ payload: res.chalet[0].id }))
    })
    this.chaletState = this.store.select('chalet');
  }

  editChalet(element) {
    this.router.navigate([`/user/chalets/${element.id}/edit`]);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

