import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../features/login/store/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
