import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pesquisa-avancada',
  templateUrl: './pesquisa-avancada.component.html',
  styleUrls: ['./pesquisa-avancada.component.scss']
})
export class PesquisaAvancadaComponent implements OnInit {
  minValue: number = 3;
  maxValue: number = 5;
  options: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true,
    getLegend: (value: number): string => {
      return  value.toString();
    }
  };
    

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'c_curso', 'c_enade', 'funcionamento'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
  constructor() { }

  ngOnInit(): void {
  }

}


export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  c_curso: number;
  c_enade:number;
  funcionamento:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Escola Bahiana de Medcina e Saúde Pública / EBMSP', name: 'Salvador/BA', weight: 'Privado', symbol: 'Ativo', c_curso:4, c_enade:4, funcionamento: 1808},
  {position: 'Universidade Federal da Bahia UFBA', name: 'Salvador/BA', weight: 'Pública', symbol: 'Ativo', c_curso:4, c_enade:4, funcionamento: 1952}
  
];