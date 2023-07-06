import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service'
import { HighchartsChartModule } from 'highcharts-angular';
import { NewDashboardComponent } from '../new-dashboard.component';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dash-regioes',
  templateUrl: './dash-regioes.component.html',
  template: '<div [id]="chartId"></div>',
  styleUrls: ['./dash-regioes.component.scss']
})
export class DashRegioesComponent implements OnInit {
  chartId = 'chart-container-bar';
  chartOptions: Highcharts.Options = {}; // Define o tipo de dados como Highcharts.Options

  ngOnInit() {
    
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        spacing: [2, 10, 10, 0],
        width:530
      },
      title: {
        text: ''
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
        gridLineWidth: 0
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        column: {
          pointWidth: 100 ,
          colorByPoint: true // Ajuste a largura dos pontos das barras
        },
        series: {
          stacking: 'normal',
            marker: {
              enabled: false
            },
            showInLegend: false,
            borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{y} %'
          }
        }
      },
      navigation: {
        buttonOptions: {
            enabled: false
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'column',
        name: 'Capital',
        data: [67],
        colors: ['#61ABEC']
      }, {
        type: 'column',
        name: 'Interior',
        data: [33],
        colors: ['#C20082']
      
      }]
    };

    Highcharts.chart('chart-container-bar', chartOptions);
  }

}
