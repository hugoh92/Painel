import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
//import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service'

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  
  panelOpenState = false;
  options: any = {};
  

  constructor(
    private highchartsService: HighchartsService, 
    private location: Location, public router: Router,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.highchartsService.drawPlotPiram("piramide")
    this.highchartsService.drawPlotPiram("piramidem")
    this.highchartsService.drawDonutRegime("regime")
    this.highchartsService.drawDonutRegime("regimem")
    this.highchartsService.drawDonutTitulação("titulacao")
    this.highchartsService.drawDonutTitulação("titulacaom")
    this.highchartsService.drawDonutCor2("idraca")
    //this.highchartsService.drawDonutCor2("idracam")
    this.highchartsService.drawDonutAlunTip("tipoAluno")
    this.highchartsService.drawDonutAlunTip("tipoAlunom")
    this.highchartsService.drawDonutAlunCor("corAluno")
    //this.highchartsService.drawDonutAlunCor("corAlunom")
    this.highchartsService.drawDonutAlunPiram("PAluno")
    this.highchartsService.drawDonutAlunPiram("PAlunom")
    this.highchartsService.drawCorM("corM")
    this.highchartsService.drawCorAlunM("corAlunom")
    
    
    
    this.getData();
  }

  getData() {
    let id_curso = this.router.url.match(/\/([^\/]+)\/?$/)[1]
    this._dataService.getData(`https://django-direm.herokuapp.com/api/curso/?codigo_curso=${id_curso}`).subscribe(
      json => {
        this.options = json[0]
        if (!this.options) {
          this.router.navigate(["/buscador"])
        }
      }
    )
  }

  public toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  goBack() {
    this.location.back();
  }

  treatNull(string, flagMetric = false){
    return string == "NULL" || string === undefined || (flagMetric && isNaN(parseFloat(string)  ))? '---' : string;
  }

}
