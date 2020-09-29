import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router'; //import router
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements AfterViewInit {
  typeMode = "side";

  @ViewChild('options') public sidenavOptions: MatSidenav;
  @ViewChild('icons') public sidenavInfo: MatSidenav;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth < 768){
      this.sidenavInfo.close();
      this.sidenavOptions.close();
      this.typeMode = "over";
    } else {
      this.sidenavInfo.open();
      this.typeMode = "side";
    };
  }

  constructor(public router: Router, public _sidebarService: SidebarService) { }  //create instance

  ngAfterViewInit(): void {
    this.setSideNav();
    if(window.innerWidth < 768){
      setTimeout(() => {
        this.sidenavInfo.close();  
      }, 500);
      this.typeMode = "over";
    }
  }

  setSideNav() {
    this._sidebarService.sidenavInfo = this.sidenavInfo;
    this._sidebarService.sidenavOptions = this.sidenavOptions;
  }


}
