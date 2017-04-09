import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'register', component: UserComponent, data : { type : 'register'} },
  { path: 'login', component: UserComponent, data : { type : 'login'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
