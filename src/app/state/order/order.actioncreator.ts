import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Order } from 'app/order/models/order';
import { ORDER_ADD_ATTEMPT, ORDER_COMPLETE_ATTEMPT, ORDER_ADD } from 'app/state/order/order.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderActionCreator {
  public orders: FirebaseListObservable<Order[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase
  ) {
    this.orders = afDb.list('/orders');
  }

  public addOrder(order: Order): void {
    this.ngRedux.dispatch({
      type: ORDER_ADD_ATTEMPT,
      payload: order
    })

    this.orders.push(order).then((addedOrder) => {
      order.$key = addedOrder.key;
      this.ngRedux.dispatch({
        type: ORDER_ADD,
        payload: order
      })
    }).catch((error) => {
      console.log(error); // TODO
    })
  }

  public completeOrder(order: Order): void {
    this.ngRedux.dispatch({
      type: ORDER_COMPLETE_ATTEMPT,
      payload: order
    })
  }
}
