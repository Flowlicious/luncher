import { Order } from 'app/order/models/order';
import { OrderService } from 'app/order/shared/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Params, ActivatedRoute } from '@angular/router';

export class IOrderDetailComponent {
  currentUser: any;
  order: Order;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => {
      this.currentUser = auth;
    });
    if (this.route) {
      this.route.params.switchMap((params: Params) => this.orderService.getByKey(params['orderid']))
        .subscribe((order: Order) => {
          this.order = order;
        });
    }
  }
}
