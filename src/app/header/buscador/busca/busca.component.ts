import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  emailFormControl = new FormControl('');
  selectedId:any = 2;
  searchText:string;
  selectedObject: any;
  options: any = []; 

  constructor(private _dataService: DataService) {
    this._dataService.getAutocompleteOptions().subscribe(
      json => {
        this.options = json;
      }
    )
  } 

  ngOnInit(): void {
    // this.testeGraf();
  }

  textEntered(e){
    this.searchText = e;
  }

  valueSelected(e){
    this.selectedObject = JSON.stringify(e);
  }
  // testeGraf(){
  //   Highcharts.chart('otonome', {

  //     title: {
  //         text: 'Logarithmic axis demo'
  //     },
  
  //     xAxis: {
  //         tickInterval: 1,
  //         type: 'logarithmic',
  //         accessibility: {
  //             rangeDescription: 'Range: 1 to 10'
  //         }
  //     },
  
  //     yAxis: {
  //         type: 'logarithmic',
  //         minorTickInterval: 0.1,
  //         accessibility: {
  //             rangeDescription: 'Range: 0.1 to 1000'
  //         }
  //     },
  
  //     tooltip: {
  //         headerFormat: '<b>{series.name}</b><br />',
  //         pointFormat: 'x = {point.x}, y = {point.y}'
  //     },
  
  //     series: [{
  //         data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  //         pointStart: 1
  //     }]
  // });
  // }

}
