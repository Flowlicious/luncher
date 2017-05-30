import { OrderService } from 'app/order/shared/order.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Order } from 'app/order/models/order';
import { Meal } from 'app/order/models/meal';
import { OrderUser } from 'app/order/models/user';
import { ActivatedRoute, Params } from '@angular/router';

export class IAddMealComponent {
  order: Order;
  form: FormGroup;
  currentUser: firebase.User;
  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private angularFire: AngularFire,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('([0-9]{0,2}((.)[0-9]{0,2}))$')]],
      info: [''],
    });
    this.angularFire.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
    if (this.route) {
      this.route.params.switchMap((params: Params) => this.orderService.getByKey(params['orderid']))
        .subscribe((order: Order) => this.order = order);
    }
  }

  /**
   * Returns a Meal object from the form model
   */
  prepareSaveMeal(): Meal {
    const formModel = this.form.value;
    const saveMeal: Meal = {
      name: formModel.name as string,
      info: formModel.info as string,
      createdFrom: new OrderUser(this.currentUser),
      price: formModel.price as number
    };
    return saveMeal;
  }
}
