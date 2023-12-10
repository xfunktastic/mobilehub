import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Importar Forms module, ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
