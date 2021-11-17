import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BuscadorModule } from './modules/buscador/buscador.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { ResultadoComponent } from './header/buscador/resultado/resultado.component';
import {MatNativeDateModule} from '@angular/material/core';

import { Ng5SliderModule } from 'ng5-slider';
import { AlertComponent } from './shared/alert/alert.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { DataExplorerComponent } from './header/data-explorer/data-explorer.component';
import { OutputComponent } from './header/data-explorer/output/output.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultadoComponent,
    AlertComponent,
    LoaderComponent,
    DataExplorerComponent,
    OutputComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    BuscadorModule,
    Ng5SliderModule ,
    MatNativeDateModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
