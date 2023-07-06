import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service'
import { HighchartsChartModule } from 'highcharts-angular';
import { NewDashboardComponent } from '../new-dashboard.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dash-capital',
  templateUrl: './dash-capital.component.html',
  template: '<div [id]="chartId"></div>',
  styleUrls: ['./dash-capital.component.scss']
})
export class DashCapitalComponent implements OnInit {
  constructor(private highchartsService: HighchartsService) { }

  ngOnInit() {
    const idHtml = 'chart-container';
    const chartOptions = this.highchartsService.getChartOptions(idHtml, {});

    Highcharts.chart(idHtml, chartOptions);
  }
}