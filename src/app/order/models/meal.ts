import { OrderUser } from './user';
import { BaseModel } from 'app/common/baseModel';
export class Meal extends BaseModel {
  public id: number;
  public name: string;
  public info: string;
  public orderKey: string;
  public createdFrom?: OrderUser;
  public price?: Number;
  constructor(createdFrom: OrderUser) {
    super();
    this.id = 0;
    this.name = '';
    this.info = '';
    this.createdFrom = createdFrom;
    this.price = 0;
    this.orderKey = '';
  }
}
