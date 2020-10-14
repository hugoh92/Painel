import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  options: any = {};

  constructor(
    private location: Location, public router: Router,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let id_curso = this.router.url.match(/\/([^\/]+)\/?$/)[1]
    this._dataService.getData(`https://jequiecovid19.com/api/curso/?codigo_curso=${id_curso}`).subscribe(
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
    return string == "NULL" || string === undefined || (flagMetric && isNaN(parseFloat(string)))? '---' : string;
  }

}
