import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service';


class Metadata {
  metrica: string;
  title: string;
  subtitle: string;
}

var titles: Array<Metadata> = [
  { metrica: "qt_vagas_autorizadas", title: "Distribuição do quantitativo de vagas.", subtitle: "Brasil, 2019" },
  { metrica: "qt_inscrito_total", title: "Distribuição do número de inscritos.", subtitle: "Brasil, 2019" },
  { metrica: "qt_ingresso_total", title: "Distribuição do número de ingressos.", subtitle: "Brasil, 2019" },
  { metrica: "qt_matricula_total", title: "Distribuição do número de matrículas.", subtitle: "Brasil, 2019" },
  { metrica: "qt_concluinte_total", title: "Distribuição do número de concluintes.", subtitle: "Brasil, 2019" },
  { metrica: "total_docentes", title: "Distribuição do número de docentes.", subtitle: "Brasil, 2019" },
  { metrica: "tx_concorrencia", title: "Distribuição da taxa de concorrência.", subtitle: "Brasil, 2019" },
  { metrica: "tx_ocupacao", title: "Distribuição da taxa de ocupação.", subtitle: "Brasil, 2019" },
  { metrica: "tx_sucesso", title: "Distribuição da taxa de sucesso.", subtitle: "Brasil, 2019" },
  { metrica: "aluno_docente", title: "Distribuição da relação aluno docente.", subtitle: "Brasil, 2019" },
  { metrica: "valor_enade", title: "Distribuição do conceito de curso ENADE.", subtitle: "Brasil, 2019" },
  { metrica: "valor_cc", title: "Distribuição do conceito de curso.", subtitle: "Brasil, 2019" },
  { metrica: "qt_cursos", title: "Distribuição do número de cursos.", subtitle: "Brasil, 2019" },
]

import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
HC_map(Highcharts);

@Component({
  selector: 'app-output',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnChanges {
  @Input() metricaSelecionada = 'qt_vagas_autorizadas';
  @Input() cruzamentoSelecionado = null;
  @Input() estadosSelecionados: any[] = [{ nome: 'Brasil' }];
  @Input() anosSelecionados: any[] = [2010, this._dataService.year]
  dataPlot = []
  mapData;
  dataFiltered = []
  Highcharts: typeof Highcharts = Highcharts;
  mapOptions: Highcharts.Options;
  plotOptions: Highcharts.Options;
  updateMap = false
  currentTab = 0;
  value: number = 2019
  options = {
    floor: 2010,
    ceil: 2019
  };

  constructor(private _dataService: DataService, private _highchartsService: HighchartsService) { 
    this.drawMap(this.metricaSelecionada)
  }

  ngOnChanges(changes: SimpleChanges): void {
     
    if (changes['metricaSelecionada'] && changes['metricaSelecionada'].previousValue != changes['metricaSelecionada'].currentValue) {
      const prev = changes['metricaSelecionada'].previousValue

      if (prev == undefined) {
        this.getData(this.metricaSelecionada, null)
      } else {
        this.createPlots(this.currentTab)
      }
    }
    if (changes['anosSelecionados'] && changes['anosSelecionados'].previousValue != changes['anosSelecionados'].currentValue) {
      this.createPlots(this.currentTab)
    }

    if (changes['cruzamentoSelecionado']) {
      const prev = changes['cruzamentoSelecionado'].previousValue,
        current = changes['cruzamentoSelecionado'].currentValue,
        estados = this.estadosSelecionados || [null]

      this.dataPlot = []
      estados.forEach(
        d => {
          this.getData(this.metricaSelecionada, d, current)
        }
      )


    }


    if (changes['estadosSelecionados'] && changes['estadosSelecionados'].previousValue != changes['estadosSelecionados'].currentValue) {
      const prev = changes['estadosSelecionados'].previousValue,
        current = changes['estadosSelecionados'].currentValue;

      if (prev != undefined) {
        const novaLocalizacao = current.filter(x => !prev.map(d => d.nome).includes(x.nome));

        if (novaLocalizacao.length > 0) {
          this.getData(this.metricaSelecionada, novaLocalizacao[0], this.cruzamentoSelecionado)
        } else {
          const removeLocalizacao = prev.filter(x => !current.map(d => d.nome).includes(x.nome));
          const index = this.dataPlot.findIndex(d => d.name == removeLocalizacao[0].nome)

          if (index > -1) {
            this.dataPlot.splice(index, 1)
          }
          this.createPlots(this.currentTab)
        }

      } else {
        this.getData(this.metricaSelecionada, current[1], this.cruzamentoSelecionado)
      }

    }
  }

  drawPlot(metrica) {
    let data = this.dataPlot.map(d => {
      return {
        name: d.name, data: d.data
          .filter((d: any) => d.ano >= this.anosSelecionados[0])
          .filter((d: any) => d.ano <= this.anosSelecionados[1])
      }
    })

    var metadata = titles.filter(d => d.metrica == metrica)[0];
    let flagCruzamento = this.cruzamentoSelecionado === null ? false : true;
    let dataplot = this.formatData(data, metrica, flagCruzamento)
    if (this.cruzamentoSelecionado !== null) {
      if(dataplot.type == "histogram"){
        this.plotOptions = this._highchartsService.drawHistogramCruz("plotData", dataplot.data, metadata)
      } else if(dataplot.type == "line") {
        this.plotOptions =  this._highchartsService.drawLinePlot("plotData", dataplot.data, metadata)
      } else if(dataplot.type == "column") {
        this.plotOptions =  this._highchartsService.drawColumnPlotCruz("plotData", dataplot.data, metadata)
      }
      
    }
    else if (Math.max(...dataplot.data.map(d => d.data.length)) == 1) {
      this.plotOptions =  this._highchartsService.drawHistogram("plotData", dataplot.data, metadata)
    } else {
      this.plotOptions = this._highchartsService.drawLinePlot("plotData", dataplot.data, metadata)
    }

  }

  getData(metrica, estado = null, cruzamento = null) {
    const filter = estado === null ? null : estado.id
    const nome = estado === null ? "Brasil" : estado.nome

    this._dataService.getCardData(filter, cruzamento, false).subscribe(data => {
      let data_ = { "name": nome, "data": data }
      this.dataPlot.push(data_);
      this.createPlots(this.currentTab)
    })

  }

  createPlots(event) {
    if(event.index !== undefined){
      this.currentTab = event.index
    }

    if (this.currentTab == 0){
      this.drawPlot(this.metricaSelecionada)
      this.drawMap(this.metricaSelecionada)
    } else {
      this.drawMap(this.metricaSelecionada)
    }
  }


  formatData(data, metrica, cruzamento = false) {
    var result = [];
    var num_anos = data[0].data.map(d => d.ano).filter((v, i, a) => a.indexOf(v) === i).length
    var num_localizacao = data.length

    if (!cruzamento) {
      data.forEach(d => {
        result.push({
          id: d.name,
          name: d.name,
          data: d.data.map(u => { return { x: parseInt(u["ano"]), y: u[metrica] } }).filter(n => n.y).map(d => [d.x, d.y])
        })
      })
      return {"type": "line", "data": result}
    } else {
      var vals = []

      if (num_anos == 1) {
        var year = data[0].data[0].ano
        data.forEach(d => {
          vals.push({
            local: d.name,
            data: d.data.map(d => {
              let obj = {};
              let key = d[this.cruzamentoSelecionado];
              obj[key] = d[metrica]

              return obj
            })
          })
        })


        let current = {}
        vals.forEach(function (obj) {
          let objs = obj.data.reduce((prev, current) => {
            return Object.assign(prev, current)
          })

          for (var key in objs) {
            if (current[key] === undefined)
              current[key] = []

            current[key].push([obj.local, objs[key]])
          }
        })

        for (var key in current) {
          result.push({
            year: year,
            name: key,
            data: current[key]
          })
        }
        return {"type": "histogram", "data": result}
      } 
      
      if (num_anos > 1 && num_localizacao == 1) {
        const result = transformArr(data[0].data, this.cruzamentoSelecionado, metrica)
        result["name"] = data[0].name
        return {"type": "line", "data": result}
      }

      var colors = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
      '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
      if (num_anos > 1 && num_localizacao > 1) {
        let result = data.map(d => {
          return transformArr2(d.data, this.cruzamentoSelecionado, metrica, d.name)
        }).reduce((a, b) => a.concat(b), [])

        let n_types = result.map(d => d.name).filter((v, i, a) => a.indexOf(v) === i).length
        let fator_opacity = 0.8 / n_types

        var types = {}, states = {},
        i, j, cur, axis = 0, opacity = 1;
        for (i = 0, j = result.length; i < j; i++) {
            cur = result[i];
            if (!(cur.name in types)) {
                types[cur.name] = opacity;
                result[i].id = cur.name
                opacity = opacity - fator_opacity;
            } else {
              result[i].linkedTo = cur.name
            }

            if (!(cur.stack in states)) {
              states[cur.stack] = colors[axis];
              axis = axis + 1;
            } 
            result[i].opacity = types[cur.name];
            result[i].color = states[cur.stack];
            result[i].name = cur.name
            result[i].cat = cur.stack
        }

        return {"type": "column", "data": result}
      }
    }
  }

  drawMap() {
    let metrica = this.metricaSelecionada
    if(this.mapData === undefined){
      this._dataService.getMapData(null, false).subscribe((json: any) => {
        var metadata = titles.filter(d => d.metrica == metrica)[0];
        this.mapData = json;
        let data = formatMap(this.mapData, this.value, metrica)
        this.mapOptions = this._highchartsService.getMapOptions("mapData2", data, metadata)
      })
    } else {
      var metadata = titles.filter(d => d.metrica == metrica)[0];
      let data = formatMap(this.mapData, this.value, metrica)
      this.mapOptions = this._highchartsService.getMapOptions("mapData2", data, metadata)
    }
  }
}

function formatMap(data, year, metrica){
  let data_aux = data.map(d => d[metrica]),
  max = Math.max(...data_aux),
  min = Math.min(...data_aux);

  let result = data.filter(d => d.ano == year).map(d => { return ['br-' + d.uf.toLowerCase(), d[metrica]] })
  return {data: result, min: min, max: max}
}

function transformArr2(orig, key, value, name) {
  var newArr = [],
      types = {},
      i, j, cur;
  for (i = 0, j = orig.length; i < j; i++) {
      cur = orig[i];
      if (!(cur[key] in types)) {
          types[cur[key]] = {name: cur[key], data: []};
          newArr.push(types[cur[key]]);
      } 
      if (cur[value]) {
          types[cur[key]].data.push([cur["ano"], cur[value]]);
          types[cur[key]].stack = name
      }
  }
  return newArr;
}

function transformArr(orig, key, value) {
  var newArr = [],
      types = {},
      i, j, cur;
  for (i = 0, j = orig.length; i < j; i++) {
      cur = orig[i];
      if (!(cur[key] in types)) {
          types[cur[key]] = {name: cur[key], data: []};
          newArr.push(types[cur[key]]);
      }
      if (cur[value]) {
          types[cur[key]].data.push([cur["ano"], cur[value]]);
      }
  }
  return newArr;
}