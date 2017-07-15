import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { StoreService } from 'app/service/store.service';
import { NgReduxModule } from '@angular-redux/store/lib/src';
import { OrderActionCreator } from 'app/state/order/order.actioncreator';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    OrderModule,
    UserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgReduxModule
  ],
  providers: [StoreService, OrderActionCreator, MealActionCreator, SelectedOrderActionCreator],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(storeService: StoreService) {
    storeService.initStore();
  }
}
