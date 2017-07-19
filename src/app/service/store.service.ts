import { Injectable } from '@angular/core';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { IAppState } from '../state/state.type';
import { combineReducers } from 'redux';
import { OrderReducer } from '../state/order/order.reducer';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/order/models/order';
import { SelectedOrderReducer } from 'app/state/selectedOrder/selectOrder.reducer';
import { UndoReducer } from 'app/state/undo/undo.reducer';

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
  }

  private _initStore(orders): void {
    const initialState = {
      orders: orders,
      selectedOrder: null,
      undoAction: null
    };
    const enhancers = this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];
    const rootReducer = combineReducers<IAppState>({
      orders: OrderReducer,
      selectedOrder: SelectedOrderReducer,
      undoAction: UndoReducer
    });

    this.ngRedux.configureStore(
      rootReducer,
      initialState as IAppState,
      null,
      enhancers
    );
  }
}
