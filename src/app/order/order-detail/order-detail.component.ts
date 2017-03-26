import { OrderService } from './../services/order.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from 'app/order/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<OrderDetailComponent>, @Inject(MD_DIALOG_DATA) public order: Order,
              private orderService: OrderService) { }

  ngOnInit() {
  }

  onComplete() {
    this.orderService.completeOrder(this.order);
    this.dialogRef.close();
  }

}
