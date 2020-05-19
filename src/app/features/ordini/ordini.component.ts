import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.css']
})
export class OrdiniComponent implements OnInit {

  constructor() { }

  today: Date = new Date();

  ngOnInit() { }

}
