import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { EmailPasswordCredentials } from "angularfire2/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials : EmailPasswordCredentials;
  constructor(public af: AngularFire) { }

  ngOnInit() {
  }

  register() {
    this.af.auth.createUser(this.credentials);
  }

}
