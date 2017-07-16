import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { UndoSnackComponent } from 'app/order/shared/undo.snack.component';
import { IAppState } from 'app/state/state.type';
import { select, NgRedux } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';
import { UndoAction } from 'app/order/models/undoAction';

export const selectUndoActionFromStore = (appState: IAppState) => {
  debugger;
  return appState.undoAction;
}

@Injectable()
export class UndoService {
  // @select(selectUndoActionFromStore)
  public undoActionFromStore: any;
  constructor(private mdSnackbar: MdSnackBar, private ngRedux: NgRedux<IAppState>) {

  }

  openUndoSnack() {
    this.mdSnackbar.openFromComponent(UndoSnackComponent);
  }

  init() {
    this.ngRedux.select('undoAction').subscribe((undoAction) => {
      debugger;
      this.openUndoSnack();
    })
  }
}
