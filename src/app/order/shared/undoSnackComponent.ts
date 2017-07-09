import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UndoService } from './undoService';
import { UndoAction } from 'app/order/models/undoAction';
import { MdSnackBar } from '@angular/material';
@Component(
  {
    selector: 'app-undo-snack-component',
    template: `
      <div *ngIf="action" fxLayout="row">
        <span style="color: white" fxLayoutAlign="start center"  fxFlex>Your data has changed</span>
        <button fxLayoutAlign="end" md-button color="accent" (click)="undo()">Undo</button>
      </div>
    `
  })
export class UndoSnackComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  action: UndoAction;
  constructor(private undoService: UndoService, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.subscription = this.undoService.getAction().subscribe(action => {
      this.action = action;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  undo() {
    this.undoService.undo();
    this.snackbar.dismiss();
  }
}
