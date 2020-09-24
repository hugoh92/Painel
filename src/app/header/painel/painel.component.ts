import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router'; //import router
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements AfterViewInit {
  @ViewChild('options') public sidenavOptions: MatSidenav;
  @ViewChild('icons') public sidenavInfo: MatSidenav;

  constructor(public router:Router, private _sidebarService: SidebarService) { }  //create instance

  ngAfterViewInit(): void {
  this.setSideNav();
  }
  
  setSideNav(){
    this._sidebarService.sidenavInfo = this.sidenavInfo;
    this._sidebarService.sidenavOptions = this.sidenavOptions;
  }


}
