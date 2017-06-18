import { Meal } from './../models/meal';
import { Order } from './../models/order';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { UndoService } from 'app/order/shared/undoService';
import { UndoAction } from 'app/order/models/undoAction';
import { MdSnackBar } from '@angular/material';
import { UndoSnackComponent } from 'app/order/shared/undoSnackComponent';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class OrderService {
  public orders: FirebaseListObservable<Order[]>;
  public meals: FirebaseListObservable<Meal[]>;
  constructor(private afDb: AngularFireDatabase, private undoService: UndoService, private snackbar: MdSnackBar) {
    this.orders = afDb.list('/orders');
    this.meals = afDb.list('/meals');
  }

  /**
   * Gets all orders of today
   */
  getAllToday(): FirebaseListObservable<Order[]> {
    return this.afDb.list('/orders', {
      query: {
        orderByChild: 'createdAt',
        equalTo: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
      }
    });
  }

  /**
 * Gets all orders of today
 */
  getMealsByOrderKey(orderKey: string): FirebaseListObservable<Meal[]> {
    return this.afDb.list('/meals', {
      query: {
        orderByChild: 'orderKey',
        equalTo: orderKey
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
  getOrderByKey(key: string) {
    return this.afDb.object(`/orders/${key}`);
  }

  /**
   * Gets a meal by key from the Database
   * @param key Meal key
   */
  getMealByKey(key: string) {
    return this.afDb.object(`/meals/${key}`);
  }

  /**
   * Adds a Meal to a order
   * @param order The order to add a meal to
   * @param meal The meal to add
   */
  addMeal(meal: Meal) {
    /*    const orderToUpdate: FirebaseObjectObservable<Order> = this.getByKey(order.$key);
        let meals = [];
        orderToUpdate.subscribe(data => {
          if (!data.meals) {
            data.meals = [];
          }
          meals = data.meals;
        });
        meal.id = new Date().getTime();
        meals.push(meal);*/
    this.meals.push(meal);
    // orderToUpdate.update({ meals: meals });
  }

  /**
   * Deletes a Meal from an Order
   * @param order The order to delete the meal from
   * @param meal The meal to delete
   */
  deleteMeal(meal: Meal) {
    this.meals.remove(meal.$key);
    /*    const orderToUpdate: FirebaseObjectObservable<Order> = this.getByKey(order.$key);
        let meals = [];
        orderToUpdate.subscribe(data => {
          if (!data.meals) {
            data.meals = [];
          }
          meals = data.meals;
        });
        const deleteIndex = meals.findIndex(m => m.id === meal.id);
        meals.splice(deleteIndex, deleteIndex + 1);
        orderToUpdate.update({ meals: meals });
        order.meals = meals;*/
    this.undoService.addAction(new UndoAction(UndoAction.actionDelete, meal, '/orders'));
    this.snackbar.openFromComponent(UndoSnackComponent);
  }

  /**
   * Updates a meal from an order
   * @param order The order to update the meal from
   * @param meal The meal to be updated
   */
  updateMeal(meal: Meal) {
    const mealToUpdate: FirebaseObjectObservable<Meal> = this.getMealByKey(meal.$key);
    debugger;
    mealToUpdate.update({ info: meal.info, name: meal.name, price: meal.price });
    /*  let meals = [];
      orderToUpdate.subscribe(data => {
        if (!data.meals) {
          data.meals = [];
        }
        meals = data.meals;
      });
      const mealIndex = meals.findIndex(m => m.id === meal.id);
      meals[mealIndex].info = meal.info;
      meals[mealIndex].name = meal.name;
      meals[mealIndex].price = meal.price;*/
    // orderToUpdate.update({ meals: meals });
  }

  /**
   * Completes the order by setting 'completed' to true
   * @param order The order to complete
   */
  completeOrder(order: Order) {
    const orderToUpdate = this.getOrderByKey(order.$key);
    if (order.delivery) {
      orderToUpdate.update({ completed: true, delivery: order.delivery });
    } else {
      orderToUpdate.update({ completed: true });
    }
  }





}
