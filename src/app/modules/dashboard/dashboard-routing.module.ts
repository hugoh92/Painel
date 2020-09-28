import { Routes } from "@angular/router";
import { PainelComponent } from 'src/app/header/painel/painel.component';

export const DashboardRoutes: Routes = [
  {
    path: 'painel',
    component: PainelComponent,
    children: [
      {
        path: ':uf', //:uf is dynamic here
        component: PainelComponent
      }
    ]
  }
]
