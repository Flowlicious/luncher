import { OrderService } from './../services/order.service';
import { Order } from './../models/order';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  public order: Order;
  constructor(public dialogRef: MdDialogRef<AddOrderComponent>, private orderService: OrderService) {
   }

  ngOnInit() {
    this.order = new Order();
  }

  onSave() {
    this.orderService.add(this.order);
    this.dialogRef.close();
  }
}
