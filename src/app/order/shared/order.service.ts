import { Meal } from './../models/meal';
import { Order } from './../models/order';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { UndoAction } from 'app/order/models/undoAction';
import { NgRedux } from '@angular-redux/store/lib/src';
import { IAppState } from 'app/state/state.type';
import { ORDER_ADD, ORDER_UPDATE } from 'app/state/order/order.action';
@Injectable()
export class OrderService {
  public orders: FirebaseListObservable<Order[]>;
  public meals: FirebaseListObservable<Meal[]>;
  constructor(private afDb: AngularFireDatabase, private ngRedux: NgRedux<IAppState>) {
    this.orders = afDb.list('/orders');
    this.meals = afDb.list('/meals');
  }
  /**
   * Gets all orders of today
   */
  getAllToday(): FirebaseListObservable<Order[]> {
    return this.afDb.list('/orders', {
      query: {
        orderByChild: 'createdAt',
        equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
      }
    });
  }

  /**
 * Gets all orders of today
 */
  getMealsByOrderKey(orderKey: string): FirebaseListObservable<Meal[]> {
    return this.afDb.list('/meals', {
      query: {
        orderByChild: 'orderKey',
        equalTo: orderKey
      }
    });
  }

  /**
   * Adds an order to the database
   * @param order The order to add
   */
  add(order: Order) {
    this.orders.push(order);
  }

  /**
   * Gets an order by key from the Database
   * @param key Order Key
   */
  getOrderByKey(key: string) {
    return this.afDb.object(`/orders/${key}`);
  }

  /**
   * Gets a meal by key from the Database
   * @param key Meal key
   */
  getMealByKey(key: string) {
    return this.afDb.object(`/meals/${key}`);
  }

  /**
   * Adds a Meal to a order
   * @param order The order to add a meal to
   * @param meal The meal to add
   */
  addMeal(meal: Meal) {
    this.meals.push(meal);
  }

  /**
   * Deletes a Meal from an Order
   * @param order The order to delete the meal from
   * @param meal The meal to delete
   */
  deleteMeal(meal: Meal) {
    return this.meals.remove(meal.$key);
  }

  /**
   * Updates a meal from an order
   * @param order The order to update the meal from
   * @param meal The meal to be updated
   */
  updateMeal(meal: Meal) {
    const mealToUpdate: FirebaseObjectObservable<Meal> = this.getMealByKey(meal.$key);
    mealToUpdate.update({ info: meal.info, name: meal.name, price: meal.price });
  }

  /**
   * Completes the order by setting 'completed' to true
   * @param order The order to complete
   */
  completeOrder(order: Order) {
    const orderToUpdate = this.getOrderByKey(order.$key);
    if (order.delivery) {
      orderToUpdate.update({ completed: true, delivery: order.delivery });
    } else {
      orderToUpdate.update({ completed: true });
    }
  }


  undo(action) {
    switch (action.collection) {
      case '/meals':
        if (action.action === UndoAction.actionDelete) {
          this.addMeal(action.object);
        }
        break;
    }
  }





}
