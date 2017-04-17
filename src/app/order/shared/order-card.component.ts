import { AddMealComponent } from '../add-meal/add-meal.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { Order } from '../models/order';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
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
