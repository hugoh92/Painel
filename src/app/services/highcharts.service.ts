import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  constructor() { }

  drawStackedPlot(idHtml){
    let options: any = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Stacked bar chart'
      },

      yAxis: {
          min: 0,
          title: {
              text: 'Total fruit consumption'
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: [{
          name: 'John',
          data: [.90]
      }, {
          name: 'Jane',
          data: [.1]
      }]
  }
    Highcharts.chart(idHtml, options);
  }


}
