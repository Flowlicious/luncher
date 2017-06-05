import { OrderUser } from './user';
export class Meal {
  public id: number;
  public name: string;
  public info: string;
  public createdFrom?: OrderUser;
  public price?: Number;
  constructor(createdFrom: OrderUser) {
    this.id = 0;
    this.name = '';
    this.info = '';
    this.createdFrom = createdFrom;
    this.price = 0;
  }
}
