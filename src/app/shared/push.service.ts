import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';
import { Order } from 'app/order/models/order';
import { Message } from 'app/order/models/message';

@Injectable()
export class PushService {
  private subscription: NgPushRegistration;

  constructor(private http: Http) { }

  subscribeToPush(subscr: NgPushRegistration, user) {
    this.subscription = subscr;
    this.http.post(
      'https://us-central1-luncher-d3328.cloudfunctions.net/webPush',
      { action: 'subscribe', subscription: subscr, user: user }
    )
      .map(res => res.json()).subscribe(data => console.log('--->', data))
  }

  unsubscribeFromPush() {
    this.http.post(
      'https://us-central1-luncher-d3328.cloudfunctions.net/webPush',
      { action: 'unsubscribe', subscription: this.subscription }
    )
      .map(res => res.json()).subscribe(data => {
        console.log('--->', data);
        this.subscription = null;
      })
  }

  sendPushToAll(msg: Message) {
    const payload = { 'users': 'ALL', 'msg': msg };
    return this.http.post('https://us-central1-luncher-d3328.cloudfunctions.net/message', payload)
      .map(res => res.json())
  }

  sendPushToUsers(msg: Message, users: string[]) {
    const payload = { 'users': users , 'msg': msg };
    console.log('payload: ' + JSON.stringify(payload));
    return this.http.post('https://us-central1-luncher-d3328.cloudfunctions.net/message', payload)
      .map(res => res.json())
  }
}
