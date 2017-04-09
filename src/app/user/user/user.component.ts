import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  credentials: EmailPasswordCredentials;
  isRegister: boolean;
  isLogin: boolean;
  errorMessage: string;
  constructor(private route: ActivatedRoute, public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.credentials = { email: "", password: "" };
    this.isRegister = this.route.snapshot.data.type === 'register';
    this.isLogin = this.route.snapshot.data.type === 'login';
  }

  login() {
    debugger;
    this.af.auth.login(this.credentials)
      .then((success) => {
        this.router.navigate(['order']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  register() {
    this.af.auth.createUser(this.credentials);
    this.router.navigate(['order']);
  }

  cancel() {
    this.router.navigate(['order']);
  }


}
