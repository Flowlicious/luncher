import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from './../models/order';
import { IOrderDetailComponent } from 'app/order/order-detail/Iorder-detail.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent extends IOrderDetailComponent {
  currentUser: any;
  order: Order;
  constructor(private os: OrderService, private _afAuth: AngularFireAuth, private _route: ActivatedRoute, private router: Router) {
    super(os, _route, _afAuth);
  }
  /**
   * Completes an order with an optional estimated delivery time
   * @param deliveryTime adds a estimated time for delivery to the order (optional)
   */
  onComplete(deliveryTime?: string) {
    if (this.currentUser.uid !== this.order.createdFrom.uid) {
      return;
    }
    this.order.delivery = deliveryTime;
    this.os.completeOrder(this.order);
    this.router.navigate(['/order']);
  }
}
