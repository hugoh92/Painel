import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements AfterViewInit {
  data: any= {};
  localizacao: any = {};
  flagBrasilRoute = true;
  textCursos = 'Cursos por Região';

  constructor(private _highchartsService: HighchartsService, private _dataService: DataService, private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => this.drawPlot(event.url.slice(-2)), 500)
      }

      if (event instanceof NavigationError) {
      }

    })

  }

  ngAfterViewInit(): void {

    this.drawPlot(this.router.url.slice(-2))


  }

  drawPlot(filter = null) {
    this.flagBrasilRoute = this.router.url.slice(-2) === null || this.router.url.slice(-2) == 'el';
    this.textCursos = this.flagBrasilRoute ? 'Cursos por Região' : 'Cursos por Município';


    this._dataService.getPlot1Data(filter).subscribe((json: any) => {
      let data = json.map(d => { return { y: d.n, name: d.org_academica } })
      this._highchartsService.drawPiePlot("pieplot", data)
    })

    this._dataService.getPlot2Data(filter).subscribe((json: any) => {
      var total_priv = json.filter(d => d.natureza_juridica == "Privada").map(d => d.n).reduce((a,b) => a + b);
      var total_publ = json.filter(d => d.natureza_juridica == "Pública").map(d => d.n).reduce((a,b) => a + b);
      var total = json.map(d => d.n).reduce((a,b) => a + b);

      let data = [
        {
          y: 100*total_priv/total,
          color: '#96bc31',
          drilldown: {
            name: 'Privada',
            categories: [
              json.filter(d => d.natureza_juridica == "Privada").map(d => d.cat_admin)
            ],
            data: [
              json.filter(d => d.natureza_juridica == "Privada").map(d => 100*d.n/total)
            ]
          }
        },
        {
          y: 100*total_publ/total,
          color: '#00adef',
          drilldown: {
            name: 'Pública',
            categories: [
              json.filter(d => d.natureza_juridica == "Pública").map(d => d.cat_admin)
            ],
            data: [
              json.filter(d => d.natureza_juridica == "Pública").map(d => 100*d.n/total)
            ]
          }
        },

      ]
  
      this._highchartsService.drawSuburnPlot("pieplot2", data)


    })
  
    this._dataService.getMapData(filter).subscribe((json: any) => {
      if(filter === null || filter == 'el'){
        let data = json.map(d => { return ['br-' + d.uf.toLowerCase(), d.qt_cursos] })
        this._highchartsService.draMap("mapPlot", data)
      } else {

        let cod_uf = json[0].codigo_do_municipio.substr(0, 2)
        this.data = json.sort((a, b) => b.qt_cursos - a.qt_cursos).slice(0, 5);

        let data = json.map(d => { return [d.codigo_do_municipio, d.municipio, d.qt_cursos] })
        this._dataService.getData(`https://servicodados.ibge.gov.br/api/v2/malhas/${cod_uf}?resolucao=5&formato=application/vnd.geo+json`).subscribe( (geojson:any) => {
          this._highchartsService.draMap("mapPlot", data, geojson)
        })
      }


    })

    this._dataService.getLocalizacaoData(filter).subscribe((json:any) => {
      this.localizacao = json;
    })
  }

  updateMetric(event){
    console.log(event)
  }

}
