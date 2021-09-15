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
  }

  textEntered(e){
    this.searchText = e;
  }

  valueSelected(e){
    this.selectedObject = JSON.stringify(e);
  }
}
