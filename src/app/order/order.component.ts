import { Router } from '@angular/router';
import { MobileService } from '../common/mobileSerivce';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { Order } from './models/order';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FirebaseApp } from 'angularfire2';
import { AddOrderDialogComponent } from 'app/order/add-order/add-order.dialog.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrderService } from './shared/order.service';

@Component({ selector: 'app-order', templateUrl: './order.component.html', styleUrls: ['./order.component.css'] })
export class OrderComponent implements OnInit {
  public orders: FirebaseListObservable<Order[]>;
  constructor(private dialog: MdDialog, private orderService: OrderService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.orders = this.orderService.getAllToday();
      }
    });
  }

  /**
   * Opens a dialog to add an order
   */
  addOrderDialog() {
    if (!MobileService.isMobile) {
      this.dialog.open(AddOrderDialogComponent);
    } else {
      this.router.navigate(['/add-order']);
    }
  }
}
