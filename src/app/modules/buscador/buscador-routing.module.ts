import { Routes } from "@angular/router";
import { from } from 'rxjs';
import { BuscaComponent } from 'src/app/header/buscador/busca/busca.component';
import { PesquisaAvancadaComponent } from 'src/app/header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import {ResultadoComponent} from 'src/app/header/buscador/resultado/resultado.component'
export const BuscadorRoutes: Routes = [
  {
    path: 'buscador',
    component: BuscaComponent,
  },
  {
    path: 'buscador/avancado',
    component: PesquisaAvancadaComponent,
  },
  {
    path: 'buscador/resultado',
    component: ResultadoComponent,
  }

]
