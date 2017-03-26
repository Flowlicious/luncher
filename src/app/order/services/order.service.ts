import { Meal } from './../models/meal';
import { Order } from './../models/order';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  public orders: FirebaseListObservable<Order[]>;
  constructor(private af: AngularFire) {
     this.orders = af.database.list('/orders');
  }

  getAll() {
    return this.orders;
  }

  add(order: Order) {
    this.orders.push(order);
  }

  getByKey(key: string) {
    return this.af.database.object(`/orders/${key}`);
  }

  addMeal(order: Order, meal: Meal) {
   const orderToUpdate:  FirebaseObjectObservable<Order> =  this.getByKey(order.$key);
   let meals = [];
   orderToUpdate.subscribe(data => {
    if (!data.meals) {
      data.meals = [];
    }
    meals = data.meals;
   });
   meals.push(meal);
   orderToUpdate.update( { meals: meals } );
  }

  completeOrder(order: Order) {
    const orderToUpdate = this.getByKey(order.$key);
    orderToUpdate.update( { completed: true } );
  }



}
