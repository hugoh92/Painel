import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/painel',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: 'src/app/modules/buscador/buscador.module#BuscadorModule',
  },
  {
    path: '',
    loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
