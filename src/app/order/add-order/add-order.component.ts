import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Order } from './../models/order';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { OrderUser } from 'app/order/models/user';
import { IAddOrderComponent } from 'app/order/add-order/Iadd-order.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrderActionCreator } from 'app/state/order/order.actioncreator';
import { PushService } from 'app/shared/push.service';
import { Message } from 'app/order/models/message';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent extends IAddOrderComponent {
  order: Order;
  form: FormGroup;
  currentUser: any;
  constructor(private orderActionCreator: OrderActionCreator,
    private angularFireAuth: AngularFireAuth, private fb: FormBuilder, private router: Router, private _route: ActivatedRoute,
    private push: PushService) {
    super(angularFireAuth, fb, _route);
  }

  /**
   * Saves the current order to the database and returns to order route
   */
  onSave() {
    if (this.form.invalid) { return; }
    const order = this.prepareSaveOrder();
    this.orderActionCreator.addOrder(order);
    this.sendMessage(new Message('eine neue Bestellung!',
      `${order.createdFrom.displayName} möchte gerne bei ${order.where} bestellen`))
    this.router.navigate(['/order']);
  }
  sendMessage(msg) {
    this.push.sendPushToAll(msg).subscribe(data => {
      msg = { title: '', message: '' };
    })
  }

}
