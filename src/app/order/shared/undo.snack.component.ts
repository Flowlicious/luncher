import { OnInit, Component, OnDestroy } from '@angular/core';
import { UndoAction } from 'app/order/models/undoAction';
import { MdSnackBar } from '@angular/material';
import { IAppState } from 'app/state/state.type';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';
import { UndoActionCreator } from 'app/state/undo/undo.actioncreator';

export const selectUndoActionFromStore = (appState: IAppState) => {
  return appState.undoAction;
}

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
export class UndoSnackComponent implements OnInit {
  action: UndoAction;
  @select(selectUndoActionFromStore)
  private undoActionFromStore: Observable<UndoAction>;
  constructor(private snackbar: MdSnackBar, private undoActionCreator: UndoActionCreator) { }

  ngOnInit() {
    this.undoActionFromStore.subscribe((undoAction: UndoAction) => {
      if (undoAction) {
        this.action = undoAction;
      } else {
        this.snackbar.dismiss();
      }
    });
  }

  undo() {
    this.undoActionCreator.undo(this.action);
  }
}
