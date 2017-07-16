import { Injectable } from '@angular/core';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { IAppState } from '../state/state.type';
// import { IS_DEBUG_MODE } from '../../../config/constant';
import * as createLoggerRef from 'redux-logger';
import { combineReducers } from 'redux';
import { OrderReducer } from '../state/order/order.reducer';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import 'rxjs/add/observable/forkJoin';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/order/models/order';
import { SelectedOrderReducer } from 'app/state/selectedOrder/selectOrder.reducer';

@Injectable()
export class StoreService {
  public orders: FirebaseListObservable<Order[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private afDb: AngularFireDatabase
  ) { }

  public initStore(): void {
    this._initStore([]);
    /*     const orders = this.afDb.list('/orders', {
          query: {
            orderByChild: 'createdAt',
            equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
          }
        }).first().subscribe((orderArray = []) => {
          this._initStore(orderArray);
        }, () => {

        }); */
  }

  private _initStore(orders): void {
    const initialState = {
      orders: orders,
      selectedOrder: null
    };
    const enhancers = this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];
    const rootReducer = combineReducers<IAppState>({
      orders: OrderReducer,
      selectedOrder: SelectedOrderReducer
    });

    this.ngRedux.configureStore(
      rootReducer,
      initialState as IAppState,
      null,
      enhancers
    );
  }
}
