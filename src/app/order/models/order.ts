import { Meal } from './meal';
import { BaseModel } from 'app/common/baseModel';
import { OrderUser } from './user';
import { FirebaseListObservable } from 'angularfire2/database';
export class Order extends BaseModel {
  public where?: string;
  public when?: string;
  public description?: string;
  public url?: string;
  public meals?: FirebaseListObservable<Meal[]>;
  public completed?: boolean;
  public createdAt?: number;
  public createdFrom?: OrderUser;
  public delivery?: string;
  constructor(createdFrom: OrderUser) {
    super();
    this.where = '';
    this.when = '';
    this.description = '';
    this.url = '';
    this.meals = null;
    this.completed = false;
    this.createdAt = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(); // saves the date without time as string
    this.createdFrom = createdFrom;
    this.delivery = '';
  }
}
