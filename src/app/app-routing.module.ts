import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataExplorerComponent } from './header/data-explorer/data-explorer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/painel',
    pathMatch: 'full'
  },
  {path: 'data-explorer', component: DataExplorerComponent},
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
