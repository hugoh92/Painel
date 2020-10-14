import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from 'src/app/services/data.service';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements AfterViewInit {
  typeMode = "side";
  loadingRouteConfig: boolean;
  data; 
  
  @ViewChild('options') public sidenavOptions: MatSidenav;
  @ViewChild('icons') public sidenavInfo: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenavInfo.close();
      this.sidenavOptions.close();
      this.typeMode = "over";
    } else {
      if (!(this.sidenavOptions.opened || this.sidenavInfo.opened)) {
        this.sidenavInfo.open();
      }
      this.typeMode = "side";
    };
  }

  constructor(public router: Router, private _dataService: DataService, public _sidebarService: SidebarService) {

  }  //create instance

  ngAfterViewInit(): void {
    this.setSideNav();
    if (window.innerWidth < 768) {
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

  getData(event) {
    /*let sigla_uf = event.url.match(/\/([^\/]+)\/?$/)[1]
    let url_data = sigla_uf == 'painel' ? `http://35.188.71.6/api/curso/` : `http://35.188.71.6/api/curso/?uf=${sigla_uf}`;

      
    // this._dataService.getData(url_data).subscribe((json: any) => {
    //   if (!json.length) {
    //     this.router.navigate(["/painel"])
    //   } else {
    //     this.formatData(json);
    //   }
    // })
  }

  formatData(json){
    let data = json
    .reduce((acc, cur) => {
      return {
        qt_inscrito_total: (+acc.qt_inscrito_total) + (cur.qt_inscrito_total != "NULL" ? + cur.qt_inscrito_total : 0 ),
        qt_vaga_total_2018: (+acc.qt_vaga_total_2018) + (cur.qt_vaga_total_2018 != "NULL" ? + cur.qt_vaga_total_2018 : 0)
      }
    })

    this.data = data;
    console.log(data);
  }
}
