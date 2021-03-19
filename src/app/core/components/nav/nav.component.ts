import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../features/login/store/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isAuth$: Observable<boolean>;
  public showMenu: string;
  chaletuidobs: Observable<string>;

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.chaletuidobs = this.store.select(fromApp.getAuthChaletUID);
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
    this.showMenu = '';
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
