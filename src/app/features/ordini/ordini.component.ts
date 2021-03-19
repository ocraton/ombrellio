import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../../core/services/subscription.service';



@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit, OnDestroy {

  constructor(private subService: SubscriptionService) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
