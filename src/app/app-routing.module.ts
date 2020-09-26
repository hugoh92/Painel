import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './header/painel/painel.component';

const routes: Routes = [
  {
    path: '',
    component: PainelComponent,
    children:[
               {
                 path:':uf', //:uf is dynamic here
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
