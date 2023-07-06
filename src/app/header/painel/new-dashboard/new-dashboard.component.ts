import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service'

var dataKeys = [
  {key: 'qt_cursos', value: 'Cursos'},
  {key: 'qt_vagas_autorizadas', value: 'Vagas oferecidas'},
  {key: 'qt_inscrito_total', value: 'Inscritos'},
  {key: 'qt_ingresso_total', value: 'Ingressos'},
  {key: 'qt_matricula_total', value: 'Matriculados'},
  {key: 'qt_concluinte_total', value: 'Concluintes'},
]

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})

export class NewDashboardComponent implements OnInit {
  data: any = {};
  localizacao: any = {};
  flagBrasilRoute = true;
  matButton = "qt_cursos";
  nameDiv = dataKeys.filter(d => d.key == this.matButton).map(d => d.value);
  textCursos = 'Cursos por Região';
  mobileFilter = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    
    if (event.target.innerWidth < 1100) {
      this.mobileFilter = false;
      
    } else {
      this.mobileFilter = true;
    };
  }

  constructor(private _highchartsService: HighchartsService, private _dataService: DataService, private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

     /*  if (event instanceof NavigationEnd) {
        setTimeout(() => this.drawPlot(event.url.slice(-2)), 500)
      } */

      if (event instanceof NavigationError) {
      }

    })

  }
  

  onValChange(val: string){
    this.matButton = val;
    this.nameDiv = dataKeys.filter(d => d.key == this.matButton).map(d => d.value);
    //this.drawMap(this.router.url.slice(-2), this.matButton);
    this.drawMap('el', this.matButton);

  }

  ngAfterViewInit(): void {
    if (window.innerWidth< 1100) {
      this.mobileFilter = false;
      
    } else {
      this.mobileFilter = true;
    };

    //this.drawMap(this.router.url.slice(-2), this.matButton)
    this.drawMap('el', this.matButton);

  }

  
  drawMap(filter, metric = 'qt_cursos'){
    
    this._dataService.getMapData(filter).subscribe((json: any) => {
      if (filter === null || filter == 'el') {
        let dataEstados = json.map(d => { return { municipio: d.uf, qt_cursos: d[metric] } }).sort((a, b) => b[metric] - a[metric]);
        let data = json.map(d => { return ['br-' + d.uf.toLowerCase(), d[metric]] })
       
        this._highchartsService.draNewMap("mapPlot", data)

       
        this._dataService.getData('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1%7C2%7C3%7C4%7C5/estados').subscribe((regiao: any) => {
          let dataRegiao = regiao.map(d => { return { sigla: d.sigla, regiao: d.regiao.nome } })
          let merged = [];

          for (let i = 0; i < dataRegiao.length; i++) {
            merged.push({
              ...dataRegiao[i],
              ...(dataEstados.find((itmInner) => itmInner.municipio === dataRegiao[i].sigla))
            }
            );
          }
          
          var result = [];
          merged.reduce(function (res, value) {
            if (!res[value.regiao]) {
              res[value.regiao] = { regiao: value.regiao, qt_cursos: 0 };
              result.push(res[value.regiao])
            }
            res[value.regiao].qt_cursos += value.qt_cursos;
 
            return res;
          }, {});
   
          this.data = result.map(d => { return { municipio: d.regiao, qt_cursos: d.qt_cursos } })

        })
    
      } else {
        let cod_uf = json[0].codigo_do_municipio.substr(0, 2)
        this.data = json.sort((a, b) => b[metric] - a[metric]).map(d => { return { municipio: d.municipio, qt_cursos:  d[metric] } }).slice(0, 5);

        let data = json.map(d => { return [d.codigo_do_municipio, d.municipio, d[metric]] })
        this._dataService.getData(`https://servicodados.ibge.gov.br/api/v2/malhas/${cod_uf}?resolucao=5&formato=application/vnd.geo+json`).subscribe((geojson: any) => {
          this._highchartsService.draNewMap("mapPlot", data, geojson)
        })
        
      }


    })
  }

  updateMetric(event) {
    event
  }

  ngOnInit(): void {
    
  }

}
