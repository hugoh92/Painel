import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BuscadorRoutes } from './buscador-routing.module';
import { BuscaComponent } from 'src/app/header/buscador/busca/busca.component';
import { PesquisaAvancadaComponent } from 'src/app/header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import { DemoMaterialModule } from 'src/app/material-module';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [BuscaComponent, PesquisaAvancadaComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    Ng5SliderModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(BuscadorRoutes),
  ],
  exports: [
    BuscaComponent,
    PesquisaAvancadaComponent
  ]
})
export class BuscadorModule { }


