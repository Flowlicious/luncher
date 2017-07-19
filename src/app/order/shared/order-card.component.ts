import { AddMealDialogComponent } from '../add-meal/add-meal.dialog.component';
import { Router } from '@angular/router';
import { MobileService } from '../../common/mobileSerivce';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { Order } from '../models/order';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';

@Component({ selector: 'app-order-card', templateUrl: './order-card.component.html', styleUrls: ['./order-card.component.css'] })
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Output() updateSelectedOrder = new EventEmitter<any>();
  constructor(private dialog: MdDialog, private router: Router, private selectedOrderActionCreator: SelectedOrderActionCreator) { }

  ngOnInit() { }

  /**
   * Opens a dialog to add a meal to the order
   * @param order The order to add a meal to
   */
  openMealDialog(order: Order) {
    if (!MobileService.isMobile) {
      this.dialog.open(AddMealDialogComponent, { data: order.$key });
    } else {
      this.router.navigate(['/add-meal', order.$key]);
    }
  }

  /**
   * Opens a dialog containing the selected order
   * @param order The order to open
   */
  openOrderDetail(order: Order) {
    if (!MobileService.isMobile) {
/*       this.updateSelectedOrder.emit({
        selectedOrder: order
      }); */
       this.selectedOrderActionCreator.selectOrder(this.order.$key);
    } else {
      this.router.navigate(['/order-detail', this.order.$key]);
    }
  }

}
