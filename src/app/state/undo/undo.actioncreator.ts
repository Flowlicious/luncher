import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../state.type';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { UndoAction } from 'app/order/models/undoAction';
import { UNDO_NEW, UNDO_ATTEMPT_UNDO, UNDO_COMPLETE_UNDO } from 'app/state/undo/undo.action';

@Injectable()
export class UndoActionCreator {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private afDb: AngularFireDatabase
  ) {
  }

  /**
   * adds a new undoActino to the store
   * @param undoAction the action to be added
   */
  public newUndo(undoAction: UndoAction) {
    this.ngRedux.dispatch({
      type: UNDO_NEW,
      payload: undoAction
    });
  }

  /**
   * undos the action in the state
   * @param undoAction the action to be undone
   */
  public undo(undoAction: UndoAction) {
    this.ngRedux.dispatch({
      type: UNDO_ATTEMPT_UNDO,
      payload: undoAction
    });
    if (undoAction.action === UndoAction.actionDelete) {
      this.afDb.list(`/${undoAction.collection}`).push(undoAction.object).then((result) => {
        this.ngRedux.dispatch({
          type: UNDO_COMPLETE_UNDO,
          payload: null
        });
      });
    }
    if (undoAction.action === UndoAction.actionUpdate) {
      this.afDb.object(`/${undoAction.collection}/${undoAction.object.$key}`).update(undoAction.object).then((result) => {
        this.ngRedux.dispatch({
          type: UNDO_COMPLETE_UNDO,
          payload: null
        });
      });
    }
  }
}
