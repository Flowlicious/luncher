import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Order } from 'app/order/models/order';
import { ORDER_ADD_ATTEMPT, ORDER_ADD } from 'app/state/order/order.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { SELECT_ORDER, SELECTEDORDER_ORDER_COMPLETE_ATTEMPT } from 'app/state/selectedOrder/selectedOrder.action';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';
import { Meal } from 'app/order/models/meal';

@Injectable()
export class SelectedOrderActionCreator {
  public orders: FirebaseListObservable<Order[]>;
  public meals: FirebaseListObservable<Meal[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase,
    private mealActionCreator: MealActionCreator
  ) {
    this.orders = afDb.list('/orders');
    this.meals = afDb.list('/meals');
  }

  /**
   * Sets the selectedOrder object in the state and reads meals
   * @param key the key of the order to be selected
   */
  public selectOrder(key: string): void {
    this.afDb.object(`/orders/${key}`).subscribe((order: Order) => {
      this.afDb.list('/meals', {
        query: {
          orderByChild: 'orderKey',
          equalTo: order.$key
        }
      }).first().subscribe((mealArray) => {
        order.meals = mealArray;
        this.ngRedux.dispatch({
          type: SELECT_ORDER,
          payload: order
        });
      })

    });
  }

  /**
   * completes the selected order
   * @param order the order to be completed
   */
  public completeOrder(order: Order) {
    this.ngRedux.dispatch({
      type: SELECTEDORDER_ORDER_COMPLETE_ATTEMPT,
      payload: order
    });
    const orderToUpdate = this.afDb.object(`/orders/${order.$key}`)
    if (order.delivery) {
      orderToUpdate.update({ completed: true, delivery: order.delivery });
    } else {
      orderToUpdate.update({ completed: true });
    }
  }
}
