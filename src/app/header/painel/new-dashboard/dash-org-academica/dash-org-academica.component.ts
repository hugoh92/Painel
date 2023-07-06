import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dash-org-academica',
  templateUrl: './dash-org-academica.component.html',
  styleUrls: ['./dash-org-academica.component.scss']
})
export class DashOrgAcademicaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        spacing: [5, 10, 10, 10],
      },
      title: {
        text: ''
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        minorTickLength: 0,
        tickLength: 0,
        categories: ['Centro Universitário', 'Faculdade', 'Universidade'],
        gridLineWidth: 0,
        labels: {
          style: {
            color: 'white', // Mudar a cor das categorias
            fontSize: '14px' // Mudar o tamanho das categorias
          }
        }
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
      plotOptions: {
        series: {
          marker: {
            enabled: false
          },
          showInLegend: false,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.2f}%', // Formato para exibir a porcentagem
            align: 'right',
            inside: true,
            //crop: false,
            //overflow: 'allow'
          }
        },
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
        name: '',
        data: [
          { y: 3, color: '#F1C730' },
          { y: 4, color: '#D5672B' },
          { y: 5, color: '#C20082' }]
      }]
    };

    Highcharts.chart('chart-container-org', chartOptions);
  }
}
