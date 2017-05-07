import { AddMealDialogComponent } from '../add-meal/add-meal.dialog.component';
import {Router} from '@angular/router';
import {MobileService} from '../../common/mobileSerivce';
import {AddMealComponent} from '../add-meal/add-meal.component';
import {OrderDetailDialogComponent} from '../order-detail/order-detail.dialog.component';
import {Order} from '../models/order';
import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({selector: 'app-order-card', templateUrl: './order-card.component.html', styleUrls: ['./order-card.component.css']})
export class OrderCardComponent implements OnInit {
  @Input()order : Order;
  constructor(private dialog : MdDialog, private router : Router) {}

  ngOnInit() {}

  /**
   * Opens a dialog to add a meal to the order
   * @param order The order to add a meal to
   */
  openMealDialog(order : Order) {
    if (!MobileService.isMobile) {
      this
        .dialog
        .open(AddMealDialogComponent, {data: order});
    } else {
      this
        .router
        .navigate(['/add-meal', order.$key]);
    }
  }

  /**
   * Opens a dialog containing the selected order
   * @param order The order to open
   */
  openOrderDetail(order : Order) {
     if (!MobileService.isMobile) {;
      this
        .dialog
        .open(OrderDetailDialogComponent, {data: order});
    } else {
      this
        .router
        .navigate(['/order-detail', order.$key]);
    }
  }

}
