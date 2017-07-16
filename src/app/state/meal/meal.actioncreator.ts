import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Meal } from 'app/order/models/meal';
import { MEAL_ADD_ATTEMPT, MEAL_ADD, MEAL_UPDATE_ATTEMPT } from 'app/state/meal/meal.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { SELECTEDORDER_ADD_MEAL } from 'app/state/selectedOrder/selectedOrder.action';

@Injectable()
export class MealActionCreator {
  public meals: FirebaseListObservable<Meal[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase
  ) {
    this.meals = afDb.list('/meals');
  }

  public addMeal(meal: Meal) {
    this.ngRedux.dispatch({
      type: MEAL_ADD_ATTEMPT,
      payload: meal
    })
    this.meals.push(meal).catch((error) => {
      console.log(error); // TODO
    })
  }

  public updateMeal(meal: Meal) {
    this.ngRedux.dispatch({
      type: MEAL_UPDATE_ATTEMPT,
      payload: meal
    })
    const mealToUpdate = this.afDb.object(`/meals/${meal.$key}`)
    mealToUpdate.update({ info: meal.info, name: meal.name, price: meal.price }).catch((error) => {
      console.log(error) // TODO
    });
  }
}
