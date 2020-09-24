import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PainelComponent } from './header/painel/painel.component';
import { SidenavIconsComponent } from './header/painel/sidenav-icons/sidenav-icons.component';
import { SidenavEstComponent } from './header/painel/sidenav-est/sidenav-est.component';
import { DashboardComponent } from './header/painel/dashboard/dashboard.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PesquisaAvancadaComponent } from './header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import { BuscaComponent } from './header/buscador/busca/busca.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PainelComponent,
    SidenavIconsComponent,
    SidenavEstComponent,
    DashboardComponent,
    PesquisaAvancadaComponent,
    BuscaComponent
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
