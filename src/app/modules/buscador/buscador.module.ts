import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BuscadorRoutes } from './buscador-routing.module';
import { BuscaComponent } from 'src/app/header/buscador/busca/busca.component';
import { PesquisaAvancadaComponent } from 'src/app/header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import { DemoMaterialModule } from 'src/app/material-module';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteComponent } from 'src/app/shared/autocomplete/autocomplete.component';



@NgModule({
  declarations: [BuscaComponent, PesquisaAvancadaComponent, AutocompleteComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    Ng5SliderModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(BuscadorRoutes),
  ],
  exports: [
    BuscaComponent,
    AutocompleteComponent,
    PesquisaAvancadaComponent
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class BuscadorModule { }


