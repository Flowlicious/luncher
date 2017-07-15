import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Order } from 'app/order/models/order';
import { ORDER_ADD_ATTEMPT, ORDER_COMPLETE_ATTEMPT, ORDER_ADD } from 'app/state/order/order.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { SELECT_ORDER, SELECTEDORDER_ADD_MEAL } from 'app/state/selectedOrder/selectedOrder.action';
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

  public addMeal(meal: Meal, isSelectedOrder: boolean): void {
    this.mealActionCreator.addMeal(meal).then((addedMeal) => {
      if (isSelectedOrder) { // If an order is selected, add the meal to the meals array
        this.ngRedux.dispatch({
          type: SELECTEDORDER_ADD_MEAL,
          payload: addedMeal
        });
      };
    });
  }
}
