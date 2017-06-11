import { Router } from '@angular/router';
import { MobileService } from '../common/mobileSerivce';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { Order } from './models/order';
import { Component, OnInit, animate, transition, state, trigger, style } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FirebaseApp } from 'angularfire2';
import { AddOrderDialogComponent } from 'app/order/add-order/add-order.dialog.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrderService } from './shared/order.service';

@Component(
  {
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    animations: [
      trigger('slideInOut', [
        state('close', style({
          maxWidth: '0%',
          opacity: '0'
        })),
        state('open', style({
          maxWidth: '40%',
          opacity: '1'
        })),
        transition('close => open', animate('500ms ease-in-out')),
        transition('open => close', animate('500ms ease-in-out'))
      ]),
    ]
  })
export class OrderComponent implements OnInit {
  public orders: FirebaseListObservable<Order[]>;
  public selectedOrder: Order;
  public orderOpen: String = 'close';

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

  updateSelectedOrder(event: any) {
    // if (this.orderOpen !== 1) {
    this.orderOpen = 'open';
    // }
    this.selectedOrder = event.selectedOrder;
  }
}
