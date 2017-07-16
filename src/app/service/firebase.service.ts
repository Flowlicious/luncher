import { Meal } from './../order/models/meal';
import { Order } from './../order//models/order';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { UndoAction } from 'app/order/models/undoAction';
import { NgRedux } from '@angular-redux/store/lib/src';
import { IAppState } from 'app/state/state.type';
import { ORDER_ADD, ORDER_UPDATE } from 'app/state/order/order.action';
import { SELECTEDORDER_MEALS_CHANGED } from 'app/state/selectedOrder/selectedOrder.action';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class FirebaseService {
  public orders: FirebaseListObservable<Order[]>;
  public meals: FirebaseListObservable<Meal[]>;
  constructor(private afDb: AngularFireDatabase, private ngRedux: NgRedux<IAppState>) {
    this.orders = afDb.list('/orders');
    this.meals = afDb.list('/meals');
  }

  initFirebaseSync() {
    this.orders.$ref.on('child_added', (snapshot) => {
      const newOrder = snapshot.val();
      newOrder.$key = snapshot.key;
      if (newOrder.createdAt === new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) {
        this.ngRedux.dispatch({
          type: ORDER_ADD,
          payload: newOrder
        });
      }
    });

    this.orders.$ref.on('child_changed', (snapshot) => {
      const updatedOrder = snapshot.val();
      updatedOrder.$key = snapshot.key;
      this.ngRedux.dispatch({
        type: ORDER_UPDATE,
        payload: updatedOrder
      })
    });
  }

  /**
   * Subscribes to a List of Meals from Firebase
   * @param orderKey The key to find the Meals for Order
   */
  acitvateMealSync(orderKey: string): Subscription {
    return this.afDb.list('/meals', {
      query: {
        orderByChild: 'orderKey',
        equalTo: orderKey
      }
    }).subscribe((mealArray: Meal[]) => {
      this.ngRedux.dispatch({
        type: SELECTEDORDER_MEALS_CHANGED,
        payload: mealArray
      })
    })
  }

  /**
   * Cancels the Subscription
   * @param subscription subscription to be canceled
   */
  deactivateMealSync(subscription: Subscription) {
    subscription.unsubscribe();
  }
}
