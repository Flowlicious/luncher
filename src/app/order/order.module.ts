import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderService } from './shared/order.service';
import { AddMealComponent } from './add-meal/add-meal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderCardComponent } from './shared/order-card.component';
import { NgArrayPipesModule, NgMathPipesModule } from 'ngx-pipes';
import { SumPricePipe } from './shared/sum-price.pipe';
@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxErrorsModule,
    NgArrayPipesModule,
    NgMathPipesModule
  ],
  providers: [OrderService],
  declarations: [OrderComponent, AddOrderComponent, AddMealComponent, OrderDetailComponent, OrderCardComponent, SumPricePipe],
  entryComponents: [AddOrderComponent, AddMealComponent, OrderDetailComponent]
})
export class OrderModule { }
