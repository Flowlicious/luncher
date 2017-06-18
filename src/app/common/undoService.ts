import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class undoAction {
  static readonly storageActionKey = 'undoAction';
  static readonly actionUpdate = 'update';
  static readonly actionDelete = 'delete';

  public action: string;
  public object: any;
  public collection: string;

  constructor(action: string, object: any, collection: string) {
    this.action = action;
    this.object = object;
    this.collection = collection;

    localStorage.setItem(undoAction.storageActionKey, JSON.stringify(this));
  }
}
