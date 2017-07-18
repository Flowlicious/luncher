import {
  ISelectedOrderAction, ISelectedOrderItemAction, ISelectedOrderState, ISelectedOrderMealAction,
  ISelectedOrderMealsAction
} from './selectedOrderstate.type';
import { IActionHandlerMap, IReducerActionHandlerFunction } from '../state.type';
import { SELECT_ORDER, SELECTEDORDER_MEALS_CHANGED, SELECT_ORDER_CLEAR } from 'app/state/selectedOrder/selectedOrder.action';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

const selectedOrderActionHandlerList: IActionHandlerMap<ISelectedOrderState, ISelectedOrderAction> = {
  [SELECT_ORDER]: (state: ISelectedOrderState, action: ISelectedOrderItemAction): ISelectedOrderState => {
    return action.payload;
  },
  [SELECT_ORDER_CLEAR]: (state: ISelectedOrderState, action: ISelectedOrderItemAction): ISelectedOrderState => {
    return action.payload;
  },
  [SELECTEDORDER_MEALS_CHANGED]: (state: ISelectedOrderState, action: ISelectedOrderMealsAction): ISelectedOrderState => {
    return state === null ? null : Object.assign(state, state, {
      meals: action.payload,
    });
  },
}

export function SelectedOrderReducer(state: ISelectedOrderState = null, action: ISelectedOrderAction): ISelectedOrderState {
  const actionHandler: IReducerActionHandlerFunction<ISelectedOrderState, ISelectedOrderAction> =
    selectedOrderActionHandlerList[action.type];

  return actionHandler ? actionHandler(state, action) : state;
}
