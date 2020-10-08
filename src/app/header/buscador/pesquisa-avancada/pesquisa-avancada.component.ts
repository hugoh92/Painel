import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-pesquisa-avancada',
  templateUrl: './pesquisa-avancada.component.html',
  styleUrls: ['./pesquisa-avancada.component.scss']
})
export class PesquisaAvancadaComponent implements OnInit {
  options: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    getLegend: (value: number): string => {
      return value.toString();
    }
  };
  @ViewChild(MatSort) sort: MatSort;
  
  resultsLength;

  registerForm: FormGroup = this.formBuilder.group({
    localizacao: '',
    ativos: true,
    nat_publico: true,
    nat_privado: true,
    org_universidade: true, 
    org_centrouniversitario: true, 
    org_faculdade: true,
    conceito_curso: new FormControl([0, 5]),
    conceito_enade: new FormControl([0, 5])
  });


  displayedColumns: string[] = ['nome_da_ies','sigla_da_ies','natureza_juridica','org_academica','valor_cc','valor_enade','periodo'];
  dataSource: MatTableDataSource<PeriodicElement>; 

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private formBuilder: FormBuilder, private _dataService: DataService) {

  }

  ngOnInit(): void {
    this.apiUrl(this.registerForm.value)

    this.registerForm.valueChanges
    .pipe(
      debounceTime(2000),
      distinctUntilChanged()
    )
    .subscribe(val => {
      this.apiUrl(val)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  apiUrl(val){
    console.log(val)
    var cursos_ativos = val.ativos ? 'situacao_do_curso=Em%20atividade' :  undefined;
    var natureza_juridica;
    var org_academica;
    var conceito_enade = JSON.stringify(val.conceito_enade) === JSON.stringify([0,5]) ? undefined: `valor_enade=${this.range(val.conceito_enade[0], val.conceito_enade[1]).map(d => `${d}`).join(",")}`;
    var conceito_curso = JSON.stringify(val.conceito_curso) === JSON.stringify([0,5]) ? undefined: `valor_cc=${this.range(val.conceito_curso[0], val.conceito_curso[1]).map(d => `${d}`).join("&")}`;

    if(val.nat_privada === true && val.nat_publico === true){
      natureza_juridica = undefined;
    } else if(val.nat_privado == true && val.nat_publico == false){
      natureza_juridica = 'natureza_juridica=Privada'
    } else if(val.nat_privado == false && val.nat_publico == true){
      natureza_juridica = 'natureza_juridica=Pública';
    }

    if(val.org_universidade === true && val.org_centrouniversitario === true && val.org_faculdade === true){
      org_academica = undefined;
    } else if(val.org_universidade == true && val.org_centrouniversitario == false && val.org_faculdade === false){
      org_academica = 'org_academica=Universidade';
    } else if(val.org_universidade == false && val.org_centrouniversitario == false && val.org_faculdade === true){
      org_academica = 'org_academica=Faculdade';
    } else if(val.org_universidade == false && val.org_centrouniversitario == true && val.org_faculdade === false){
      org_academica = 'org_academica=Centro%20Universitário';
    } else if(val.org_universidade == true && val.org_centrouniversitario == true && val.org_faculdade === false){
      org_academica = 'org_academica=Universidade,Centro%20Universitário';
    } else if(val.org_universidade == false && val.org_centrouniversitario == true && val.org_faculdade === true){
      org_academica = 'org_academica=Faculdade,Centro%20Universitário';
    } else if(val.org_universidade == true && val.org_centrouniversitario == false && val.org_faculdade === true){
      org_academica = 'org_academica=Universidade,Faculdade';
    }

    var filter = [cursos_ativos, natureza_juridica, org_academica, conceito_enade, conceito_curso].filter(d => d).join("&")
    console.log(`http://api.direm.org/api/curso/?query={codigo_curso,nome_da_ies,sigla_da_ies,natureza_juridica,org_academica,municipio,uf,valor_cc,valor_enade,periodo}&format=json&${filter}`)
   
    this._dataService.getData(`http://api.direm.org/api/curso/?query={codigo_curso,nome_da_ies,sigla_da_ies,natureza_juridica,org_academica,municipio,uf,valor_cc,valor_enade,periodo}&format=json&${filter}`).subscribe(
      (json: PeriodicElement[]) => {
        this.resultsLength = json.length;
        this.dataSource = new MatTableDataSource<PeriodicElement>(json);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  range(start, end) {
    if(start === end) return [start];
    return [start, ...this.range(start + 1, end)];
  }

}


export interface PeriodicElement {
  codigo_curso: number;
  nome_da_ies: string;
  sigla_da_ies: string;
  municipio: string;
  uf: string;
  natureza_juridica: string;
  org_academica: string;
  valor_cc: number;
  valor_enade: number;
  periodo: string;
}

