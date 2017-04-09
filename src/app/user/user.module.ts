import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [UserComponent],
  entryComponents: [UserComponent]
})
export class UserModule { }
