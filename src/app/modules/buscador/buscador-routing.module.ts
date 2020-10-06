import { Routes } from "@angular/router";
import { BuscaComponent } from 'src/app/header/buscador/busca/busca.component';
import { PesquisaAvancadaComponent } from 'src/app/header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import {ResultadoComponent} from 'src/app/header/buscador/resultado/resultado.component'

export const BuscadorRoutes: Routes = [
  {
    path: 'buscador',
    component: BuscaComponent,
    data: { animationState: 'buscador' }
  },
  {
    path: 'buscador/avancado',
    component: PesquisaAvancadaComponent,
    data: { animationState: 'avancado' }
  },
  
  {
    path: 'buscador',
    component: ResultadoComponent,
    data: { animationState: 'resultado' },
    children: [
      {
        path: ':cod_curso', //:cod_curso is dynamic here
        component: ResultadoComponent
      }
    ]
  }

]
