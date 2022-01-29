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
  path_image = "";
  

  constructor(
    private highchartsService: HighchartsService, 
    private location: Location, public router: Router,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getData();   
  }

  formatData(data, fl_relative = false) {
    let keys = Object.keys(data)
    let values = Object.values(data)
    let total:any = values.reduce((a:number,b:number) => a+b)
    var val:any
    let l = []
    var c_l
    for(var i:number = 0; i < keys.length; i++){
      if(fl_relative){
        val = values[i]
        c_l = [keys[i], val*100/total]
      } else{
        c_l = [keys[i], values[i]]
      }
      l.push(c_l)
      
    }


    return l
  }

  getData() {
    let id_curso = this.router.url.match(/\/([^\/]+)\/?$/)[1]
    this._dataService.getData(`${this._dataService.apiUrl2}curso/?codigo_curso=${id_curso}`).subscribe(
      json => {
        console.log(json)
        this.options = json[0]
        this.path_image = this.options.nome_img.substring(this.options.nome_img.lastIndexOf('/')+1)
        this.highchartsService.drawDonutRegime("regime",this.formatData(this.options.indicadores[0].plot_regime, true))
        this.highchartsService.drawDonutRegime("regimem",this.formatData(this.options.indicadores[0].plot_regime, true))
        this.highchartsService.drawDonutTitulação("titulacao",this.formatData(this.options.indicadores[0].plot_schooling, true))
        this.highchartsService.drawDonutTitulação("titulacaom",this.formatData(this.options.indicadores[0].plot_schooling, true))
        this.highchartsService.drawCorM("idraca",this.formatData(this.options.indicadores[0].plot_race))
        this.highchartsService.drawCorM("idracam",this.formatData(this.options.indicadores[0].plot_race))
        this.highchartsService.drawDonutAlunTip("tipoAluno",this.formatData(this.options.indicadores[0].plot_origem_escolar, true))
        this.highchartsService.drawDonutAlunTip("tipoAlunom",this.formatData(this.options.indicadores[0].plot_origem_escolar, true))
        this.highchartsService.drawCorAlunM("corAluno",this.formatData(this.options.indicadores[0].plot_race_aluno, true))
        this.highchartsService.drawCorAlunM("corAlunom",this.formatData(this.options.indicadores[0].plot_race_aluno, true))

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