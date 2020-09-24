import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import * as $ from 'jquery';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PainelComponent } from './header/painel/painel.component';
import { SidenavIconsComponent } from './header/painel/sidenav-icons/sidenav-icons.component';
import { SidenavEstComponent } from './header/painel/sidenav-est/sidenav-est.component';
import { DashboardComponent } from './header/painel/dashboard/dashboard.component';
import { PesquisaAvancadaComponent } from './header/buscador/pesquisa-avancada/pesquisa-avancada.component';
import { BuscaComponent } from './header/buscador/busca/busca.component';
import { SidebarService } from './services/sidebar.service';
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
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule
   
    
    
  ],
  providers: [SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
