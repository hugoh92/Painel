import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DashboardRoutes } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { PainelComponent } from 'src/app/header/painel/painel.component';
import { SidenavIconsComponent } from 'src/app/header/painel/sidenav-icons/sidenav-icons.component';
import { SidenavEstComponent } from 'src/app/header/painel/sidenav-est/sidenav-est.component';
import { DashboardComponent } from 'src/app/header/painel/dashboard/dashboard.component';
import { DemoMaterialModule } from 'src/app/material-module';

@NgModule({
  declarations: [
    PainelComponent,
    DashboardComponent,
    SidenavIconsComponent,
    SidenavEstComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  exports: [
    PainelComponent,
    DashboardComponent,
    SidenavIconsComponent,
    SidenavEstComponent
  ]
})
export class DashboardModule { }
