import { Injectable } from '@angular/core';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { IAppState } from '../state/state.type';
// import { IS_DEBUG_MODE } from '../../../config/constant';
import * as createLoggerRef from 'redux-logger';
import { combineReducers } from 'redux';
import { OrderReducer } from '../state/order/order.reducer';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { OrderEpic } from '../state/order/order.epic';
import 'rxjs/add/observable/forkJoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/order/models/order';

@Injectable()
export class StoreService {
  public orders: FirebaseListObservable<Order[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private orderEpic: OrderEpic,
    private afDb: AngularFireDatabase
  ) { }

  public initStore(): void {
    const orders = this.afDb.list('/orders', {
      query: {
        orderByChild: 'createdAt',
        equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
      }
    }).first().subscribe((orderArray = []) => {
    this._initStore(orderArray);
    }, () => {
      this._initStore([]);
    });

  }

  private _initStore(orders): void {
    const initialState = {
      orders: orders
    };
    const enhancers = this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];
    const orderEpics = combineEpics<any, IAppState>(
      this.orderEpic.addOrder,
      this.orderEpic.completeOrder
    );
    const middleware = [createEpicMiddleware(orderEpics)];
    const rootReducer = combineReducers<IAppState>({
      orders: OrderReducer
    });

    if (true) {
      middleware.push(
        (createLoggerRef as any).createLogger({
          level: 'info',
          collapsed: true
        }));
    }

    this.ngRedux.configureStore(
      rootReducer,
      initialState as IAppState,
      middleware,
      enhancers
    );
  }
}
