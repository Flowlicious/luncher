import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { Component, OnInit, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { Order } from './../models/order';
import { IOrderDetailComponent } from 'app/order/order-detail/Iorder-detail.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SnackService } from 'app/order/shared/snackService';
import { UndoAction } from 'app/order/models/undoAction';
import { select } from '@angular-redux/store';
import { IAppState } from '../../state/state.type';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from 'app/service/firebase.service';
import { Subscription } from 'rxjs/Subscription';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';

export const selectedOrderFromStore = (appState: IAppState) => {
  return appState.selectedOrder;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges, OnDestroy {
  public order: Order;
  @Input() orderid: string;
  currentUser: any;
  @select(selectedOrderFromStore)
  public selectedOrder: Observable<Order>;
  private mealSubscription: Subscription;

  constructor(public orderService: OrderService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router,
    private snackService: SnackService, private selectedOrderActionCreator: SelectedOrderActionCreator,
    private mealActionCreator: MealActionCreator, private firebaseService: FirebaseService) {
  }
  ngOnChanges() {
    this.selectedOrderActionCreator.selectOrder(this.orderid);
  }

  ngOnDestroy() {
    this.firebaseService.deactivateMealSync(this.mealSubscription);
  }

  ngOnInit() {
    this.selectedOrder.subscribe((selected) => {
      this.order = selected;
    })

    this.afAuth.authState.subscribe((auth) => {
      this.currentUser = auth;
    });
    if (!this.orderid) {
      this.route.params.subscribe((params: Params) => {
        if (params['orderid']) {
          this.selectedOrderActionCreator.selectOrder(params['orderid']);
        }
      });
    } else {
      this.selectedOrderActionCreator.selectOrder(this.orderid);
    }
    this.mealSubscription = this.firebaseService.acitvateMealSync(this.orderid);
  }
  /**
   * Completes an order with an optional estimated delivery time
   * @param deliveryTime adds a estimated time for delivery to the order (optional)
   */
  onComplete(deliveryTime?: string) {
    if (this.currentUser.uid !== this.order.createdFrom.uid) {
      return;
    }
    this.order.delivery = deliveryTime;
    this.selectedOrderActionCreator.completeOrder(this.order);
    this.router.navigate(['/order']);
  }

  deleteMeal(meal) {
    this.orderService.deleteMeal(meal).then(() => {
      this.snackService.openUndoSnack(new UndoAction(UndoAction.actionDelete, meal, '/meals'));
    });
  }

  updateMeal(meal) {
    this.mealActionCreator.updateMeal(meal);
  }
}
