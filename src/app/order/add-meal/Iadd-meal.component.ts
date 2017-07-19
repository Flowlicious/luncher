import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from 'app/order/models/order';
import { Meal } from 'app/order/models/meal';
import { OrderUser } from 'app/order/models/user';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { IAppState } from 'app/state/state.type';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

export class IAddMealComponent {
  orderid: string;
  form: FormGroup;
  currentUser: any;

  constructor(private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('([0-9]{0,2}((.)[0-9]{0,2}))$')]],
      info: [''],
    });
    this.angularFireAuth.authState.subscribe((auth) => {
      this.currentUser = auth;
    });
    if (this.route) {
      this.route.params.subscribe((params: Params) => {
        this.orderid = params['orderid'];
      });
    }
  }

  /**
   * Returns a Meal object from the form model
   */
  prepareSaveMeal(): Meal {
    const formModel = this.form.value;
    const saveMeal: Meal = {
      id: new Date().getTime(),
      name: formModel.name as string,
      info: formModel.info as string,
      createdFrom: new OrderUser(this.currentUser),
      price: formModel.price as number,
      orderKey: this.orderid
    };
    return saveMeal;
  }
}
