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
import { Observable } from 'rxjs/Observable';
import { IAppState } from 'app/state/state.type';
import { select } from '@angular-redux/store/lib/src';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';

const selectOrdersFromStore = (appState: IAppState) => {
  return appState.orders;
};
const selectedOrderFromStore = (appState: IAppState) => {
  return appState.selectedOrder;
};

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
  public orders: Order[];
  @select(selectedOrderFromStore)
  public selectedOrder: Observable<Order>;
  public orderOpen: String = 'close';
  @select(selectOrdersFromStore)
  public ordersFromStore: Observable<Order[]>;
  constructor(private dialog: MdDialog, public afAuth: AngularFireAuth, private router: Router,
    private selectedOrderActionCreator: SelectedOrderActionCreator
  ) {
    this.ordersFromStore.subscribe((orders: Order[]) => {
      this.orders = orders;
    })
    this.selectedOrder.subscribe((order) => {
      if (order) {
        this.orderOpen = 'open';
      } else {
        this.orderOpen = 'close';
      }
    })
  }

  ngOnInit() {
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

  close() {
    this.selectedOrderActionCreator.clearSelection();
  }

  /*   updateSelectedOrder(event: any) {
      this.orderOpen = 'open';
      this.selectedOrder = event.selectedOrder;
    } */
}
