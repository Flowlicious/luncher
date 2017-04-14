import { FirebaseAuthState } from 'angularfire2/auth';
import { OrderUser } from './user';
export class Meal {
    public name: string;
    public info: string;
    public createdFrom?: OrderUser;
    constructor (createdFrom: OrderUser) {
        this.name = '';
        this.info = '';
        this.createdFrom = createdFrom;
    }
}
