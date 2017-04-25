import { FirebaseAuthState } from 'angularfire2';
import { Meal } from './meal';
import { BaseModel } from 'app/common/baseModel';
import { OrderUser } from './user';
export class Order extends BaseModel {
    public where: string;
    public when: string;
    public description: string;
    public url: string;
    public meals?: Meal[];
    public completed?: boolean;
    public createdAt?: Date;
    public createdFrom?: OrderUser;
    public delivery?: string;
    constructor (createdFrom: OrderUser) {
        super();
        this.where = '';
        this.when = '';
        this.description = '';
        this.url = '';
        this.meals = [];
        this.completed = false;
        this.createdAt = new Date();
        this.createdFrom = createdFrom;
        this.delivery = '';
    }
}
