import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulamentoPageRoutingModule } from './regulamento-routing.module';

import { RegulamentoPage } from './regulamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegulamentoPageRoutingModule
  ],
  declarations: [RegulamentoPage]
})
export class RegulamentoPageModule {}
