import { Order } from 'app/order/models/order';
import { FirebaseListObservable } from 'angularfire2/database';

export interface IAppState {
  orders: FirebaseListObservable<Order>;
  selectedOrder: Order;
}
export type IReducerActionHandlerFunction<S, A> = (state: S, action: A) => S;

export interface IActionHandlerMap<S, A> {
    [actionHandlerId: string]: IReducerActionHandlerFunction<S, A>;
}
