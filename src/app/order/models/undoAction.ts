export class UndoAction {
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
  }
}
