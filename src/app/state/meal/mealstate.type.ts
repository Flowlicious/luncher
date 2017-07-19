import {Action} from 'redux';
import { Meal } from 'app/order/models/meal';

export type IMealState = Meal;

export interface IMealAction extends Action {
    payload?: any;
}

export interface IMealItemAction extends IMealAction {
    payload?: Meal;
}

