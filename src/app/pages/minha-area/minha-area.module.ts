import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaAreaPageRoutingModule } from './minha-area-routing.module';

import { MinhaAreaPage } from './minha-area.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhaAreaPageRoutingModule
  ],
  declarations: [MinhaAreaPage]
})
export class MinhaAreaPageModule {}
