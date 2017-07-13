import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Order } from 'app/order/models/order';
import { ORDER_ADD_ATTEMPT, ORDER_COMPLETE_ATTEMPT } from 'app/state/order/order.action';

@Injectable()
export class OrderActionCreator {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  public addOrder(order: Order): void {
    this.ngRedux.dispatch({
      type: ORDER_ADD_ATTEMPT,
      payload: order
    })
  }

  public completeOrder(order: Order): void {
    this.ngRedux.dispatch({
      type: ORDER_COMPLETE_ATTEMPT,
      payload: order
    })
  }
}
