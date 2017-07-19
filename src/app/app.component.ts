import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { select } from '@angular-redux/store';

export const getIsReadyFlagFromStore = (state) => true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Luncher';
  displayBack = false;

  @select(getIsReadyFlagFromStore)
  public appReady: boolean;
  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }
}
