import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home2Page } from './home2.page';

const routes: Routes = [
  {
    path: '',
    component: Home2Page,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'parceiros',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/parceiros/parceiros.module').then( m => m.ParceirosPageModule)
          }
        ]
      },
      {
        path: 'sobre',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/sobre/sobre.module').then( m => m.SobrePageModule)
          }
        ]
      },
      {
        path: 'minha-area',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/minha-area/minha-area.module').then( m => m.MinhaAreaPageModule)
          }
        ]
      },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Home2PageRoutingModule {}
