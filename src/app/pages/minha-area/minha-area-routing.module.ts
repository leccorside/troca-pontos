import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhaAreaPage } from './minha-area.page';

const routes: Routes = [
  {
    path: '',
    component: MinhaAreaPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhaAreaPageRoutingModule {}
