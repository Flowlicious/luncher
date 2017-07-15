import {Action} from 'redux';
import { Order } from 'app/order/models/order';
import { Meal } from 'app/order/models/meal';

export type ISelectedOrderState = Order;

export interface ISelectedOrderAction extends Action {
    payload?: any;
}

export interface ISelectedOrderItemAction extends ISelectedOrderAction {
    payload?: Order;
}

export interface ISelectedOrderMealAction extends ISelectedOrderAction {
    payload?: Meal;
}

