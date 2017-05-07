import {Router} from '@angular/router';
import {MobileService} from '../common/mobileSerivce';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AddMealComponent} from './add-meal/add-meal.component';
import {OrderService} from './shared/order.service';
import {AddOrderComponent} from './add-order/add-order.component';
import {Order} from './models/order';
import {Component, OnInit} from '@angular/core';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {MdDialog} from '@angular/material';
import {FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {AddOrderDialogComponent} from 'app/order/add-order/add-order.dialog.component';

@Component({selector: 'app-order', templateUrl: './order.component.html', styleUrls: ['./order.component.css']})
export class OrderComponent implements OnInit {
  public orders : FirebaseListObservable < Order[] >;
  private _messaging : firebase.messaging.Messaging;
  constructor(private dialog : MdDialog, private orderService : OrderService, public af : AngularFire, private router : Router) {}

  ngOnInit() {
    this
      .af
      .auth
      .subscribe((auth) => {
        if (auth) {
          this.orders = this
            .orderService
            .getAllToday();
        }
      });
  }

  /**
   * Opens a dialog to add an order
   */
  addOrderDialog() {
    if (!MobileService.isMobile) {
      this
        .dialog
        .open(AddOrderDialogComponent);
    } else {
      this
        .router
        .navigate(['/add-order']);
    }
  }
}
