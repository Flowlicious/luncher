import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OrderService } from './../shared/order.service';
import { Order } from './../models/order';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { OrderUser } from 'app/order/models/user';
import { IAddOrderComponent } from 'app/order/add-order/Iadd-order.component';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent extends IAddOrderComponent {
  order: Order;
  form: FormGroup;
  currentUser: any;
  constructor(private os: OrderService,
    private AngularFireAuth: AngularFireAuth, private fb: FormBuilder, private router: Router, private _route: ActivatedRoute) {
      super(os, AngularFireAuth, fb, _route);
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
