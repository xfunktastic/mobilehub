import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Importar Forms module, ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordPageRoutingModule } from './password-routing.module';

import { PasswordPage } from './password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [PasswordPage]
})
export class PasswordPageModule {}
