import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './header/painel/painel.component';
import { SidenavEstComponent } from './header/painel/sidenav-est/sidenav-est.component';

const routes: Routes = [

  {
    path: '',
    component: PainelComponent,
    children:[
               {
                 path:':type', //:type is dynamic here
                 component: PainelComponent
               }
             ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
