import { IUndoAction, IUndoItemAction, IUndoState } from './undostate.type';
import { IActionHandlerMap, IReducerActionHandlerFunction } from '../state.type';
import { UNDO_NEW, UNDO_ATTEMPT_UNDO, UNDO_COMPLETE_UNDO } from 'app/state/undo/undo.action';

const undoActionHandlerList: IActionHandlerMap<IUndoState, IUndoAction> = {
  [UNDO_NEW]: (state: IUndoState, action: IUndoItemAction): IUndoState => {
    return action.payload;
  },
  [UNDO_ATTEMPT_UNDO]: (state: IUndoState, action: IUndoItemAction): IUndoState => {
    return action.payload;
  },
  [UNDO_COMPLETE_UNDO]: (state: IUndoState, action: IUndoItemAction): IUndoState => {
    return action.payload;
  }
}

export function UndoReducer(state: IUndoState = null, action: IUndoAction): IUndoState {
  const actionHandler: IReducerActionHandlerFunction<IUndoState, IUndoAction> = undoActionHandlerList[action.type];
  return actionHandler ? actionHandler(state, action) : state;
}
