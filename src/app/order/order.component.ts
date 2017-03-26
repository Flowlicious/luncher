import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { OrderService } from './services/order.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { Order } from './models/order';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: FirebaseListObservable<Order[]>;
  constructor(public dialog: MdDialog, private orderService: OrderService) {

  }

  ngOnInit() {
    this.orders = this.orderService.getAll();
  }

  openOrderDialog() {
    this.dialog.open(AddOrderComponent);
  }

  openMealDialog(order: Order) {
    this.dialog.open(AddMealComponent, { data: order });
  }

  openOrderDetail(order: Order) {
    this.dialog.open(OrderDetailComponent, { data: order });
  }

}
