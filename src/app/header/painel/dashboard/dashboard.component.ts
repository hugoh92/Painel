import { AfterViewInit, Component, OnInit } from '@angular/core';
import {HighchartsService} from 'src/app/services/highcharts.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent implements AfterViewInit {

  constructor(private _highchartsService: HighchartsService 
    ) { }

  ngAfterViewInit(): void {
    this._highchartsService.draMap("stackedPlot")
    this._highchartsService.drawPiePlot("pieplot")
    this._highchartsService.drawPiePlot("pieplot2")

    
    
  }

}
