import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  href: string;

  constructor(private store: Store<fromApp.AppState>,
              private _snackBar: MatSnackBar) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

  ngOnInit(): void {
    this.linkmenu = `${window.location.protocol}//${window.location.host}/menu/${this.chaletUID}`;
  }

  openCopySnack(){
    this._snackBar.open('COPIATO!', 'OK', {
      duration: 500,
      horizontalPosition: 'end'
    });
  }

  printQrCode() {
    var divToPrint = document.getElementById('qrCodeP');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><style>img{width:400px}</style><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }

  downloadQrCode(){
    this.href = document.getElementsByTagName('img')[2].src
  }

}
