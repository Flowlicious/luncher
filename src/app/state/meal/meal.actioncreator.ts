import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { Meal } from 'app/order/models/meal';
import { MEAL_ADD_ATTEMPT, MEAL_ADD, MEAL_UPDATE_ATTEMPT, MEAL_DELETE_ATTEMPT } from 'app/state/meal/meal.action';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { UndoActionCreator } from 'app/state/undo/undo.actioncreator';
import { UndoAction } from 'app/order/models/undoAction';

@Injectable()
export class MealActionCreator {
  public meals: FirebaseListObservable<Meal[]>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase,
    private undoActionCreator: UndoActionCreator
  ) {
    this.meals = afDb.list('/meals');
  }

  /**
   * Adds the Meal to Firebase
   * @param meal The meal to be added
   */
  public addMeal(meal: Meal) {
    this.ngRedux.dispatch({
      type: MEAL_ADD_ATTEMPT,
      payload: meal
    })
    this.meals.push(meal).catch((error) => {
      console.log(error); // TODO
    })
  }

  public deleteMeal(meal: Meal) {
    this.ngRedux.dispatch({
      type: MEAL_DELETE_ATTEMPT,
      payload: meal
    })
    this.meals.remove(meal.$key).then((response) => {
      this.undoActionCreator.newUndo(new UndoAction(UndoAction.actionDelete, meal, 'meals'));
    }).catch((error) => {
      console.log(error); // TODO
    });
  }

  /**
   * Updates the meal in Firebase
   * @param meal The meal to be updated
   */
  public updateMeal(meal: Meal) {
    this.ngRedux.dispatch({
      type: MEAL_UPDATE_ATTEMPT,
      payload: meal
    })
    const mealToUpdate = this.afDb.object(`/meals/${meal.$key}`);
    mealToUpdate.first().subscribe((oldMeal) => {
      mealToUpdate.update({ info: meal.info, name: meal.name, price: meal.price }).then((response) => {
        this.undoActionCreator.newUndo(new UndoAction(UndoAction.actionUpdate, oldMeal, 'meals'));
      }).catch((error) => {
        console.log(error) // TODO
      });
    });
  }
}
