import { Order } from 'app/order/models/order';
import { OrderService } from 'app/order/shared/order.service';
import { AngularFire } from 'angularfire2';
import { Params, ActivatedRoute } from '@angular/router';

export class IOrderDetailComponent {
  currentUser: firebase.User;
  order: Order;
  constructor(private orderService: OrderService, private angularFire: AngularFire,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.angularFire.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
    if (this.route) {
      this.route.params.switchMap((params: Params) => this.orderService.getByKey(params['orderid']))
        .subscribe((order: Order) => this.order = order);
    }
  }
}
