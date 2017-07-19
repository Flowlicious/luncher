import { IMealAction, IMealItemAction, IMealState} from './mealstate.type';
import { IActionHandlerMap, IReducerActionHandlerFunction } from '../state.type';
import { MEAL_ADD } from 'app/state/meal/meal.action';

const mealActionHandlerList: IActionHandlerMap<IMealState, IMealAction> = {
  [MEAL_ADD]: (state: IMealState, action: IMealItemAction): IMealState => {
    return action.payload;
  }
}

export function OrderReducer(state: IMealState = null, action: IMealAction): IMealState {
  const actionHandler: IReducerActionHandlerFunction<IMealState, IMealAction> = mealActionHandlerList[action.type];
  return actionHandler ? actionHandler(state, action) : state;
}
