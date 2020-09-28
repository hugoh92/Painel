import { Component, OnInit } from '@angular/core';
import {HighchartsService} from 'src/app/services/highcharts.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent implements OnInit {

  constructor(private _highchartsService: HighchartsService 
    ) { }

  ngOnInit(): void {
    this._highchartsService.drawStackedPlot("stackedPlot")
    $('.btn').click(function(){
      
    });

    
    
  }

}
