import { IOrderAction, IOrderItemAction, IOrderListAction, IOrderState } from './orderstate.type';
import { IActionHandlerMap, IReducerActionHandlerFunction } from '../state.type';
import { ORDER_ADD, ORDER_UPDATE } from 'app/state/order/order.action';


const orderActionHandlerList: IActionHandlerMap<IOrderState, IOrderAction> = {
  [ORDER_ADD]: (state: IOrderState, action: IOrderItemAction): IOrderState => {
    return state == null ? Object.assign([], [action.payload]) : [...state, action.payload];
  },
  [ORDER_UPDATE]: (state: IOrderState, action: IOrderItemAction): IOrderState => {
    return state.map(order => order.$key === action.payload.$key ? action.payload : order);
  }
}

export function OrderReducer(state: IOrderState = [], action: IOrderAction): IOrderState {
  const actionHandler: IReducerActionHandlerFunction<IOrderState, IOrderAction> = orderActionHandlerList[action.type];
  return actionHandler ? actionHandler(state, action) : state;
}
