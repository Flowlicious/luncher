import {Action} from 'redux';
import { UndoAction } from 'app/order/models/undoAction';

export type IUndoState = UndoAction;

export interface IUndoAction extends Action {
    payload?: any;
}

export interface IUndoItemAction extends IUndoAction {
    payload?: UndoAction;
}

