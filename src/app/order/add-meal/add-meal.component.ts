import { OrderService } from './../services/order.service';
import { Order } from './../models/order';
import { Meal } from './../models/meal';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  public meal: Meal;
  constructor(@Inject(MD_DIALOG_DATA) public order: Order, private dialogRef: MdDialogRef<AddMealComponent>,
             private orderService: OrderService) { }

  ngOnInit() {
    this.meal = new Meal();
  }

  onSave() {
    this.orderService.addMeal(this.order, this.meal);
    this.dialogRef.close();
  }
}
