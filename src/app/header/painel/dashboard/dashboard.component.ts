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
  data = {}

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
    this._dataService.getPlot1Data(filter).subscribe((json: any) => {
      this.data = json.map(d => { return { y: d.n, name: d.org_academica } })
      this._highchartsService.drawPiePlot("pieplot", this.data)
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
      let data = json.map(d => { return ['br-' + d.uf.toLowerCase(), d.qt_cursos] })
      console
      console.log(json.map(d => { return 'br-' + d.uf }))

      this._highchartsService.draMap("mapPlot", data)
    })
  }

}
