import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Order } from './../models/order';
import { IOrderDetailComponent } from 'app/order/order-detail/Iorder-detail.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  currentUser: any;
  @Input() orderid: string;
  public order: Order;
  constructor(public orderService: OrderService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => {
      this.currentUser = auth;
    });
    if (!this.orderid) {
      this.route.params.switchMap((params: Params) => this.orderService.getOrderByKey(params['orderid']))
        .subscribe((order: Order) => {
          this.order = order;
        });
    } else {
      this.orderService.getOrderByKey(this.orderid).subscribe((order: Order) => {
        this.order = order;
        this.order.meals = this.orderService.getMealsByOrderKey(order.$key);
      });
    }
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
    this.orderService.completeOrder(this.order);
    this.router.navigate(['/order']);
  }
}
