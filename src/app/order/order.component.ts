import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { OrderService } from './services/order.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { Order } from './models/order';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: FirebaseListObservable<Order[]>;
  constructor(public dialog: MdDialog, private orderService: OrderService, public af: AngularFire) {
  }

  ngOnInit() {
    this.af.auth.subscribe((auth) => {
      if (auth) {
        this.orders = this.orderService.getAllToday();
      }
    });
  }

  /**
   * Opens a dialog to add an order
   */
  addOrderDialog() {
    this.dialog.open(AddOrderComponent);
  }

  /**
   * Opens a dialog to add a meal to the order
   * @param order The order to add a meal to
   */
  openMealDialog(order: Order) {
    this.dialog.open(AddMealComponent, { data: order });
  }

  /**
   * Opens a dialog containing the selected order
   * @param order The order to open
   */
  openOrderDetail(order: Order) {
    this.dialog.open(OrderDetailComponent, { data: order });
  }

}
