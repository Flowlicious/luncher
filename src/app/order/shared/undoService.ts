import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UndoAction } from 'app/order/models/undoAction';


@Injectable()
export class UndoService {
  private actionSubject = new BehaviorSubject<UndoAction>(null);
  constructor() { }

  addAction(undoAction: UndoAction) {
    this.actionSubject.next(undoAction);
  }

  clearAction() {
    this.actionSubject.next(null);
  }

  getAction(): Observable<UndoAction> {
    return this.actionSubject.asObservable();
  }
}
