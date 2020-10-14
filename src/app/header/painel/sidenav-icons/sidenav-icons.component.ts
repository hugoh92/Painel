import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {
  data: any = {};
  populacao: any = {};
  nameUF = "BRASIL";

  constructor(public _sidebarService: SidebarService, public router: Router, private _dataService: DataService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.getData(event.url.slice(-2));
        this.getPop(this.router.url.slice(-2));
      }

      if (event instanceof NavigationError) {
      }

    })
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  ngOnInit(): void {
    this.getData(this.router.url.slice(-2));
    this.getPop(this.router.url.slice(-2));
  }

  getData(filter = null) {
    this._dataService.getCardData(filter).subscribe((json: any) => {
      this.data = json
    })
  }

  getPop(filter = null) {
    this._dataService.getMapData(filter).subscribe((json: any) => {
      if (filter === null || filter == 'el') {
        this.nameUF = "BRASIL";
        this._dataService.getData(`https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/`).subscribe((data: any) => {
          this.populacao = data.projecao.populacao;
        })
      } else {
        let cod_uf = json[0].codigo_do_municipio.substr(0, 2);

        this._dataService.getData(`https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/${cod_uf}`).subscribe((data: any) => {
          this.populacao = data.projecao.populacao;
        })

        this._dataService.getData(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cod_uf}`).subscribe((data: any) => {
          this.nameUF = data.nome;
        })
      }

    })
  }



}
