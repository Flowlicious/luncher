import { Meal } from './meal';
import { BaseModel } from 'app/common/baseModel';
export class Order extends BaseModel {
    public where: string;
    public when: string;
    public description: string;
    public url: string;
    public meals: Meal[];
    public completed: boolean;
    constructor () {
        super();
        this.where = '';
        this.when = '';
        this.description = '';
        this.url = '';
        this.meals = [];
        this.completed = false;
    }
}
