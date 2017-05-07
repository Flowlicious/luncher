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
    public createdAt?: number;
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
        this.createdAt = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(); // saves the date without time as string
        this.createdFrom = createdFrom;
        this.delivery = '';
    }
}
