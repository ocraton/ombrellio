import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../features/login/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
  }

}
