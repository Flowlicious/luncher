import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/concat';
import { MiddlewareAPI } from 'redux';
import { IAppState } from '../state.type';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/order/models/order';
import { ORDER_ADD_ATTEMPT, ORDER_ADD, ORDER_COMPLETE_ATTEMPT, ORDER_COMPLETE } from 'app/state/order/order.action';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderEpic {
  public orders: FirebaseListObservable<Order[]>;
  constructor(private afDb: AngularFireDatabase) {
    this.orders = afDb.list('/orders', {
      query: {
        orderByChild: 'createdAt',
        equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
      }
    });
  }

  addOrder = (action$: ActionsObservable<any>, store: MiddlewareAPI<IAppState>) => {
    return action$.ofType(ORDER_ADD_ATTEMPT)
      .mergeMap(({ payload }) => {

        return this.orders.push(payload).then((result) => {
          return {
            type: ORDER_ADD,
            payload: this.orders
          }
        }).catch((error) => {
          return Observable.of({ type: ORDER_ADD, payload });
        });
      });
  };

  completeOrder = (action$: ActionsObservable<any>, store: MiddlewareAPI<IAppState>) => {
    return action$.ofType(ORDER_COMPLETE_ATTEMPT)
      .mergeMap(({ payload }) => {
        const orderToUpdate = this.afDb.object(`/orders/${payload.$key}`);
        if (payload.delivery) {
          return orderToUpdate.update({ completed: true, delivery: payload.delivery }).then((result) => {
            return {
              type: ORDER_COMPLETE,
              payload
            }
          }).catch((error) => {
            return Observable.of({ type: ORDER_COMPLETE, payload });
          });
        } else {
          orderToUpdate.update({ completed: true }).then((result) => {
            return {
              type: ORDER_COMPLETE,
              payload
            }
          }).catch((error) => {
            return Observable.of({ type: ORDER_COMPLETE, payload });
          });
        }
      });
  };
}
