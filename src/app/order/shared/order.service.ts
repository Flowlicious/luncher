import { Meal } from './../models/meal';
import { Order } from './../models/order';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  public orders: FirebaseListObservable<Order[]>;
  constructor(private afDb: AngularFireDatabase) {
    this.orders = afDb.list('/orders');
  }

  /**
   * Gets all orders of today
   */
  getAllToday() {
    return this.afDb.list('/orders', {
      query: {
        orderByChild: 'createdAt',
        equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
      }
    });
  }

  /**
   * Adds an order to the database
   * @param order The order to add
   */
  add(order: Order) {
    this.orders.push(order);
  }

  /**
   * Gets an order by key from the Database
   * @param key Order Key
   */
  getByKey(key: string) {
    return this.afDb.object(`/orders/${key}`);
  }

  /**
   * Adds a Meal to a order
   * @param order The order to add a meal to
   * @param meal The meal to add
   */
  addMeal(order: Order, meal: Meal) {
    const orderToUpdate: FirebaseObjectObservable<Order> = this.getByKey(order.$key);
    let meals = [];
    orderToUpdate.subscribe(data => {
      if (!data.meals) {
        data.meals = [];
      }
      meals = data.meals;
    });
    meal.id = new Date().getTime();
    meals.push(meal);
    orderToUpdate.update({ meals: meals });
  }

  /**
   * Deletes a Meal from an Order
   * @param order The order to delete the meal from
   * @param meal The meal to delete
   */
  deleteMeal(order: Order, meal: Meal) {
    const orderToUpdate: FirebaseObjectObservable<Order> = this.getByKey(order.$key);
    let meals = [];
    orderToUpdate.subscribe(data => {
      if (!data.meals) {
        data.meals = [];
      }
      meals = data.meals;
    });
    const deleteIndex = meals.findIndex(m => m.id === meal.id);
    debugger;
    meals.splice(deleteIndex, deleteIndex + 1);
    orderToUpdate.update({ meals: meals });
  }

  updateMeal(order: Order, meal: Meal) {
    const orderToUpdate: FirebaseObjectObservable<Order> = this.getByKey(order.$key);
    let meals = [];
    orderToUpdate.subscribe(data => {
      if (!data.meals) {
        data.meals = [];
      }
      meals = data.meals;
    });
    const mealIndex = meals.findIndex(m => m.id === meal.id);
    meals[mealIndex].info = meal.info;
    meals[mealIndex].name = meal.name;
    meals[mealIndex].price = meal.price;
    orderToUpdate.update({ meals: meals });
  }

  /**
   * Completes the order by setting 'completed' to true
   * @param order The order to complete
   */
  completeOrder(order: Order) {
    const orderToUpdate = this.getByKey(order.$key);
    if (order.delivery) {
      orderToUpdate.update({ completed: true, delivery: order.delivery });
    } else {
      orderToUpdate.update({ completed: true });
    }
  }



}
