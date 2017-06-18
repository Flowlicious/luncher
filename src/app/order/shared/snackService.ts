import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { UndoSnackComponent } from 'app/order/shared/undoSnackComponent';
import { UndoService } from 'app/order/shared/undoService';



@Injectable()
export class SnackService {
  constructor(private mdSnackbar: MdSnackBar, private undoService: UndoService) {
  }

  openUndoSnack(undoAction) {
    this.undoService.addAction(undoAction);
    this.mdSnackbar.openFromComponent(UndoSnackComponent);
  }

}
