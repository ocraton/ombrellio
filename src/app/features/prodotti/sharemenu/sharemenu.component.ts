import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sharemenu',
  templateUrl: './sharemenu.component.html',
  styleUrls: ['./sharemenu.component.scss']
})
export class SharemenuComponent implements OnInit {

  chaletUID: string;
  linkmenu: string;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

  ngOnInit(): void {
    this.linkmenu = `${window.location.protocol}//${window.location.host}/menu/${this.chaletUID}`;
  }

}
