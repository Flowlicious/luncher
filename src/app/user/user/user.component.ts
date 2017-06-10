import { FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing/src/testing';
import { OrderUser } from '../../order/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isRegister: boolean;
  isLogin: boolean;
  errorMessage: string;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private af: AngularFireModule, private router: Router, private fb: FormBuilder,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isRegister = this.route.snapshot.data.type === 'register';
    this.isLogin = this.route.snapshot.data.type === 'login';

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.isRegister) {
      this.form.addControl('displayName', new FormControl('', [Validators.required]));
    }
  }

  /**
   * Login user
   */
  login() {
    const user = this.prepareSaveUser();
    if (!this.form.valid) {
      return;
    }

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((success) => {
        this.router.navigate(['order']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * registers the user in the Database and adds a displayName
   */
  register() {
    const user = this.prepareSaveUser();
    if (!this.form.valid) {
      return;
    }
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((savedUser) => {
        savedUser.updateProfile({
          displayName: user.displayName,
          photoURL: ''
        });
      }).then((test) => {
        // Success
        this.router.navigate(['order']);
      }).catch((error) => {
        // Error
        console.log(error);
      });
  }

  /**
   * Returns a User object from the form model
   */
  prepareSaveUser(): OrderUser {
    const formModel = this.form.value;
    const saveUser: OrderUser = {
      email: formModel.email as string,
      password: formModel.password as string,
      displayName: formModel.displayName as string
    };
    return saveUser;
  }

  cancel() {
    this.router.navigate(['order']);
  }


}
