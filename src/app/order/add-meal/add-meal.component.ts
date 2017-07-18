import { Router, Params, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from './../models/order';
import { Meal } from './../models/meal';
import { Component, OnInit, Inject } from '@angular/core';
import { OrderUser } from 'app/order/models/user';
import { IAddMealComponent } from 'app/order/add-meal/Iadd-meal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent extends IAddMealComponent {
  public meal: Meal;
  form: FormGroup;
  currentUser: any;
  orderid: string;
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router,
    private _route: ActivatedRoute, private mealActionCreator: MealActionCreator) {
    super(fb, afAuth, _route);
  }

  /**
   * Saves the current meal to the order
   */
  onSave() {
    if (this.form.invalid) { return; }
    const meal = this.prepareSaveMeal();
    this.mealActionCreator.addMeal(meal);
    this.router.navigate(['/order']);
  }
}
