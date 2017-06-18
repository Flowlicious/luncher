import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UndoAction } from 'app/order/models/undoAction';
import { OrderService } from 'app/order/shared/order.service';



@Injectable()
export class UndoService {
  private actionSubject = new BehaviorSubject<UndoAction>(null);
  constructor(private os: OrderService) {
  }

  addAction(undoAction: UndoAction) {
    this.actionSubject.next(undoAction);
  }

  clearAction() {
    this.actionSubject.next(null);
  }

  getAction(): Observable<UndoAction> {
    return this.actionSubject.asObservable();
  }

  undo() {
    const action: UndoAction = null;
    this.os.undo(this.actionSubject.value);
  }
}
