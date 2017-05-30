import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseAuthState } from 'angularfire2';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OrderService } from './../shared/order.service';
import { Order } from './../models/order';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AngularFire } from 'angularfire2';
import { OrderUser } from 'app/order/models/user';
import { IAddOrderComponent } from 'app/order/add-order/Iadd-order.component';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent extends IAddOrderComponent {
  order: Order;
  form: FormGroup;
  currentUser: firebase.User;
  constructor(private os: OrderService,
    private angularFire: AngularFire, private fb: FormBuilder, private router: Router, private _route: ActivatedRoute) {
      super(os, angularFire, fb, _route);
  }

  /**
   * Saves the current order to the database and returns to order route
   */
  onSave() {
    if (this.form.invalid) { return; }
    const order = this.prepareSaveOrder();
    this.os.add(order);
    this.router.navigate(['/order']);
  }


}
