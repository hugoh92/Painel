//import { NewDashboardModule } from './modules/new-dashboard/new-dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BuscadorModule } from './modules/buscador/buscador.module'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ResultadoComponent } from './header/buscador/resultado/resultado.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatSortModule} from '@angular/material/sort';

import { Ng5SliderModule } from 'ng5-slider';
import { AlertComponent } from './shared/alert/alert.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { DataExplorerComponent, SearchPipe } from './header/data-explorer/data-explorer.component';
import { OutputComponent } from './header/data-explorer/output/output.component';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { NewDashboardComponent } from './header/painel/new-dashboard/new-dashboard.component';
import {IconsDashboardComponent} from './header/painel/new-dashboard/icons-dashboard/icons-dashboard.component';
import { DashCapitalComponent } from './header/painel/new-dashboard/dash-capital/dash-capital.component';
import { DashRegioesComponent } from './header/painel/new-dashboard/dash-regioes/dash-regioes.component';
import { DashOrgAcademicaComponent } from './header/painel/new-dashboard/dash-org-academica/dash-org-academica.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultadoComponent,
    AlertComponent,
    LoaderComponent,
    DataExplorerComponent,
    OutputComponent,
    SearchPipe,
    NewDashboardComponent,
    IconsDashboardComponent,
    DashCapitalComponent,
    DashRegioesComponent,
    DashOrgAcademicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    DemoMaterialModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    BuscadorModule,
    Ng5SliderModule,
    MatNativeDateModule,
    //NewDashboardModule,
    MatSortModule,
    ShareButtonsModule.forRoot(),
  ],
  providers: [
    SearchPipe,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
