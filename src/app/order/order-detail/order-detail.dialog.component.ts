import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from './../models/order';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailDialogComponent implements OnInit {
  currentUser: firebase.User;
  constructor(private dialogRef: MdDialogRef<OrderDetailDialogComponent>, @Inject(MD_DIALOG_DATA) public order: Order,
    private orderService: OrderService, private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
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
    this.dialogRef.close();
  }
}
