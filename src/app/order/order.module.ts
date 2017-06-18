import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderDetailDialogComponent } from './order-detail/order-detail.dialog.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderService } from './shared/order.service';
import { AddMealComponent } from './add-meal/add-meal.component';
import { AddMealDialogComponent } from './add-meal/add-meal.dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderCardComponent } from './shared/order-card.component';
import { NgArrayPipesModule, NgMathPipesModule } from 'ngx-pipes';
import { SumPricePipe } from './shared/sum-price.pipe';
import { AddOrderDialogComponent } from 'app/order/add-order/add-order.dialog.component';
import { UndoSnackComponent } from 'app/order/shared/undoSnackComponent';
import { UndoService } from 'app/order/shared/undoService';
@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxErrorsModule,
    NgArrayPipesModule,
    NgMathPipesModule,
    FormsModule
  ],
  providers: [OrderService, UndoService],
  declarations: [OrderComponent, AddOrderComponent, AddMealComponent, AddMealDialogComponent, OrderDetailDialogComponent,
    OrderDetailComponent, AddOrderDialogComponent, OrderCardComponent, SumPricePipe, UndoSnackComponent],
  entryComponents: [AddOrderComponent, AddMealComponent, OrderDetailDialogComponent, AddMealDialogComponent, AddOrderDialogComponent,
    UndoSnackComponent]
})
export class OrderModule { }
