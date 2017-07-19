import {Action} from 'redux';
import { Order } from 'app/order/models/order';

export type IOrderState = Order[];

export interface IOrderAction extends Action {
    payload?: any;
}

export interface IOrderItemAction extends IOrderAction {
    payload?: Order;
}

export interface IOrderListAction extends IOrderAction {
    payload?: Order[];
}
