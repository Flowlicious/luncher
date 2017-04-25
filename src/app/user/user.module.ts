import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxErrorsModule
  ],
  declarations: [UserComponent],
  entryComponents: [UserComponent]
})
export class UserModule { }
