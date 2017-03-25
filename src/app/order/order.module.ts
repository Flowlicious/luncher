import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './add-order/add-order.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  declarations: [OrderComponent, AddOrderComponent]
})
export class OrderModule { }
