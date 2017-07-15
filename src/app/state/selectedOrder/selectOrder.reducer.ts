import { ISelectedOrderAction, ISelectedOrderItemAction, ISelectedOrderState, ISelectedOrderMealAction } from './selectedOrderstate.type';
import { IActionHandlerMap, IReducerActionHandlerFunction } from '../state.type';
import { SELECT_ORDER, SELECTEDORDER_ADD_MEAL } from 'app/state/selectedOrder/selectedOrder.action';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

const selectedOrderActionHandlerList: IActionHandlerMap<ISelectedOrderState, ISelectedOrderAction> = {
  [SELECT_ORDER]: (state: ISelectedOrderState, action: ISelectedOrderItemAction): ISelectedOrderState => {
    return action.payload;
  },
  [SELECTEDORDER_ADD_MEAL]: (state: ISelectedOrderState, action: ISelectedOrderMealAction): ISelectedOrderState => {
    return {
      ...state,
      meals: [
        ...state.meals,
        action.payload
      ]
    }
  },
}

export function SelectedOrderReducer(state: ISelectedOrderState = null, action: ISelectedOrderAction): ISelectedOrderState {
  const actionHandler: IReducerActionHandlerFunction<ISelectedOrderState, ISelectedOrderAction> =
    selectedOrderActionHandlerList[action.type];

  return actionHandler ? actionHandler(state, action) : state;
}
