import { Router } from '@angular/router';
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
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderDialogComponent implements OnInit {
  order: Order;
  form: FormGroup;
  currentUser: firebase.User;
  constructor(public dialogRef: MdDialogRef<AddOrderDialogComponent>, private orderService: OrderService,
    private af: AngularFire, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      when: ['', [Validators.required]],
      where: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: [''],
    });

    this.af.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
  }

  /**
   * Saves the current order to the database and closes the dialog
   */
  onSave() {
    if (this.form.invalid) { return; }
    const order = this.prepareSaveOrder();
    this.orderService.add(order);
    this.dialogRef.close();
  }

  /**
   * returns a Order object from the form model
   */
  prepareSaveOrder(): Order {
    const formModel = this.form.value;
    const saveOrder: Order = {
      when: formModel.when as string,
      where: formModel.where as string,
      url: formModel.url as string,
      description: formModel.description as string,
      createdAt: new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()).getTime(), //saves the date without time as string
      createdFrom: new OrderUser(this.currentUser)
    };
    return saveOrder;
  }
}
