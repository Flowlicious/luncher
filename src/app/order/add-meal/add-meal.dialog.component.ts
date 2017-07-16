import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from './../shared/order.service';
import { Order } from './../models/order';
import { Meal } from './../models/meal';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { OrderUser } from 'app/order/models/user';
import { IAddMealComponent } from 'app/order/add-meal/Iadd-meal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealDialogComponent extends IAddMealComponent {
  public meal: Meal;
  form: FormGroup;
  currentUser: any;
  constructor( @Inject(MD_DIALOG_DATA) public order: Order, private dialogRef: MdDialogRef<AddMealDialogComponent>,
    private os: OrderService, private fb: FormBuilder, private afAuth: AngularFireAuth,
    public mealActionCreator: MealActionCreator) {
    super(os, fb, afAuth, null);
  }

  /**
   * Saves the current meal to the order
   */
  onSave() {
    if (this.form.invalid) { return; }
    const meal = this.prepareSaveMeal();
    this.mealActionCreator.addMeal(meal);
    this.dialogRef.close();
  }

}
