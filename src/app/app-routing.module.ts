import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataExplorerComponent } from './header/data-explorer/data-explorer.component';
import { NewDashboardComponent } from './header/painel/new-dashboard/new-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/painel',
    pathMatch: 'full'
  },
  {path: 'data-explorer', component: DataExplorerComponent},
  {path: 'new-dashboard',
    component: NewDashboardComponent,
    children: [
      {
        path: ':uf', //:uf is dynamic here
        component: NewDashboardComponent
      }
    ]},
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
