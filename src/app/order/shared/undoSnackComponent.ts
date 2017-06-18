import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UndoService } from './undoService';
import { UndoAction } from 'app/order/models/undoAction';
@Component(
  {
    selector: 'app-undo-snack-component',
    template: `
      <div *ngIf="action" fxLayout="row">
        <span style="color: white" fxLayoutAlign="start center"  fxFlex>Hello {{action.action}}</span>
        <button fxLayoutAlign="end" md-button color="accent">Undo</button>
      </div>
    `
  })
export class UndoSnackComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  action: UndoAction;
  constructor(private undoService: UndoService) { }

  ngOnInit() {
    this.subscription = this.undoService.getAction().subscribe(action => {
      this.action = action;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
