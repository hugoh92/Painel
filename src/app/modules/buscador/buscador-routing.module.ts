import { Routes } from "@angular/router";
import { BuscaComponent } from 'src/app/header/buscador/busca/busca.component';
import { PesquisaAvancadaComponent } from 'src/app/header/buscador/pesquisa-avancada/pesquisa-avancada.component';

export const BuscadorRoutes: Routes = [
  {
    path: 'buscador',
    component: BuscaComponent,
  },
  {
    path: 'buscador/avancado',
    component: PesquisaAvancadaComponent,
  }
]
