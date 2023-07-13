import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HighchartsService } from 'src/app/services/highcharts.service'
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dash-org-academica',
  templateUrl: './dash-org-academica.component.html',
  styleUrls: ['./dash-org-academica.component.scss']
})
export class DashOrgAcademicaComponent implements OnInit {
  localizacao: any = {};

  chartOptions: Highcharts.Options = {}; // Define o tipo de dados como Highcharts.Options
  constructor(private highchartsService: HighchartsService, private _dataService: DataService, private router: Router) {
    let filter =(this.router.url).slice(-2) 
    filter = filter == 'rd' ? 'el' : filter
    this._dataService.getPlot1Data(filter).subscribe((json: any) => {
      this.localizacao = json;
      const idHtml = 'chart-container-org';
      const chartOptions = this.highchartsService.getChartOrg(idHtml, {},json);

      Highcharts.chart(idHtml, chartOptions);
    })
    
   }

  ngOnInit() {
    
  }
    
}
