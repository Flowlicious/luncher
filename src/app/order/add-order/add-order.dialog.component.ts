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
import { OrderActionCreator } from 'app/state/order/order.actioncreator';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderDialogComponent extends IAddOrderComponent {
  order: Order;
  form: FormGroup;
  currentUser: any;
  constructor(public dialogRef: MdDialogRef<AddOrderDialogComponent>, private os: OrderService,
    private angularFireAuth: AngularFireAuth, private fb: FormBuilder, private orderActionCreator: OrderActionCreator) {
    super(os, angularFireAuth, fb, null);
  }


  /**
   * Saves the current order to the database and closes the dialog
   */
  onSave() {
    if (this.form.invalid) { return; }
    const order = this.prepareSaveOrder();
    this.orderActionCreator.addOrder(order);
    this.dialogRef.close();
  }

}
