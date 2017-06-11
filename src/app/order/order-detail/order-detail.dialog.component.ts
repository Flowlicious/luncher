import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from './../models/order';
import { IOrderDetailComponent } from 'app/order/order-detail/Iorder-detail.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailDialogComponent extends IOrderDetailComponent {
  currentUser: any;
  constructor(public dialogRef: MdDialogRef<OrderDetailDialogComponent>, @Inject(MD_DIALOG_DATA) public order: Order,
    public os: OrderService, private _afAuth: AngularFireAuth) {
    super(os, null, _afAuth);
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
    this.dialogRef.close();
  }
}
