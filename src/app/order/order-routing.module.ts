import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  }, {
    path: 'add-order',
    component: AddOrderComponent
  }, {
    path: 'add-meal/:orderid',
    component: AddMealComponent
  }, {
    path: 'order-detail/:orderid',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
