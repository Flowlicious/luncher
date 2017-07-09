import { OrderService } from 'app/order/shared/order.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from 'app/order/models/order';
import { Meal } from 'app/order/models/meal';
import { OrderUser } from 'app/order/models/user';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

export class IAddMealComponent {
  order: Order;
  form: FormGroup;
  currentUser: any;
  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute) { }

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
      this.route.params.switchMap((params: Params) => this.orderService.getOrderByKey(params['orderid']))
        .subscribe((order: Order) => this.order = order);
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
      orderKey: this.order.$key
    };
    return saveMeal;
  }
}
