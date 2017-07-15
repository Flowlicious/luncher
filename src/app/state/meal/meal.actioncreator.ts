import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Meal } from 'app/order/models/meal';
import { MEAL_ADD_ATTEMPT, MEAL_ADD } from 'app/state/meal/meal.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MealActionCreator {
  public meals: FirebaseListObservable<Meal[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase
  ) {
    this.meals = afDb.list('/meals');
  }

  public addMeal(meal: Meal): Promise<Meal> {
    this.ngRedux.dispatch({
      type: MEAL_ADD_ATTEMPT,
      payload: meal
    })
    return new Promise<Meal>((resolve, reject) => {
      this.meals.push(meal).then((addedMeal) => {
        this.ngRedux.dispatch({
          type: MEAL_ADD,
          payload: addedMeal
        });
        meal.$key = addedMeal.key;
        resolve(meal);
      }).catch((error) => {
        console.log(error); // TODO
        reject(error);
      })
    });
  }
}
