import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { Order } from './../models/order';
import { AngularFireAuth } from 'angularfire2/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UndoAction } from 'app/order/models/undoAction';
import { select } from '@angular-redux/store';
import { IAppState } from '../../state/state.type';
import { SelectedOrderActionCreator } from 'app/state/selectedOrder/selectedOrder.actioncreator';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from 'app/service/firebase.service';
import { Subscription } from 'rxjs/Subscription';
import { MealActionCreator } from 'app/state/meal/meal.actioncreator';
import { UndoService } from 'app/order/shared/undo.service';

export const selectedOrderFromStore = (appState: IAppState) => {
  return appState.selectedOrder;
}

export const selectUndoActionFromStore = (appState: IAppState) => {
  return appState.undoAction;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public order: Order;
  currentUser: any;
  @select(selectedOrderFromStore)
  public selectedOrder: Observable<Order>;
  private mealSubscription: Subscription;
  @select(selectUndoActionFromStore)
  private undoActionFromStore: Observable<UndoAction>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router,
    private selectedOrderActionCreator: SelectedOrderActionCreator,
    private mealActionCreator: MealActionCreator, private firebaseService: FirebaseService,
    private undoService: UndoService) {
  }
  /*   ngOnChanges() {
      this.selectedOrderActionCreator.selectOrder(this.orderid);
    } */

  ngOnDestroy() {
    this.firebaseService.deactivateMealSync(this.mealSubscription);
    this.selectedOrderActionCreator.clearSelection();
  }

  ngOnInit() {
    this.selectedOrder.subscribe((selected) => {
      if (selected) {
        this.order = selected;
        if (!this.mealSubscription) {
          this.mealSubscription = this.firebaseService.acitvateMealSync(this.order.$key);
        }
      }
    })
    this.undoActionFromStore.subscribe((undoAction) => {
      if (undoAction) {
        this.undoService.openUndoSnack();
      }
    })
    this.afAuth.authState.subscribe((auth) => {
      this.currentUser = auth;
    });
    if (!this.order) {
      this.route.params.subscribe((params: Params) => {
        if (params['orderid']) {
          this.selectedOrderActionCreator.selectOrder(params['orderid']);
          this.mealSubscription = this.firebaseService.acitvateMealSync(params['orderid']);
        }
      });
    }

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
    this.mealActionCreator.deleteMeal(meal);
  }

  updateMeal(meal) {
    this.mealActionCreator.updateMeal(meal);
  }
}
