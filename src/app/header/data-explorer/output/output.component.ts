import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  map;
  dataFiltered = []

  constructor(private _dataService: DataService, private _highchartsService: HighchartsService) { }

  ngOnChanges(changes: SimpleChanges): void {
     
    if (changes['metricaSelecionada'] && changes['metricaSelecionada'].previousValue != changes['metricaSelecionada'].currentValue) {
      const prev = changes['metricaSelecionada'].previousValue

      if (prev == undefined) {
        this.getData(this.metricaSelecionada, null)
      } else {
        this.drawPlot(this.metricaSelecionada)
      }
    }
    if (changes['anosSelecionados'] && changes['anosSelecionados'].previousValue != changes['anosSelecionados'].currentValue) {
      this.drawPlot(this.metricaSelecionada)
    }

    if (changes['cruzamentoSelecionado']) {
      const prev = changes['cruzamentoSelecionado'].previousValue,
        current = changes['cruzamentoSelecionado'].currentValue,
        estados = this.estadosSelecionados || [null]

      console.log(current)
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
          this.drawPlot(this.metricaSelecionada)
        }

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
      this._highchartsService.drawHistogramCruz("plotData", dataplot, metadata)
    }
    else if (Math.max(...dataplot.map(d => d.data.length)) == 1) {
      this._highchartsService.drawHistogram("plotData", dataplot, metadata)
    } else {
      this._highchartsService.drawLinePlot("plotData", dataplot, metadata)
    }

  }

  getData(metrica, estado = null, cruzamento = null) {
    const filter = estado === null ? null : estado.id
    const nome = estado === null ? "Brasil" : estado.nome

    this._dataService.getCardData(filter, cruzamento, false).subscribe(data => {
      let data_ = { "name": nome, "data": data }
      this.dataPlot.push(data_);
      this.drawPlot(metrica)
    })

  }

  formatData(data, metrica, cruzamento = false) {
    var result = [];
    if (!cruzamento) {
      data.forEach(d => {
        result.push({
          name: d.name,
          data: d.data.map(u => { return { x: parseInt(u["ano"]), y: u[metrica] } }).filter(n => n.y).map(d => [d.x, d.y])
        })
      })
    } else {
      var vals = []
      data.forEach(d => {
        vals.push({
          local: d.name,
          ano: d.data.map(d => parseInt(d["ano"])).filter((v, i, a) => a.indexOf(v) === i),
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
          name: key,
          data: current[key]
        })
      }
    }

    return result
  }

  drawMap(metrica) {
    this._dataService.getMapData().subscribe((json: any) => {
      let data = json.map(d => { return ['br-' + d.uf.toLowerCase(), d[metrica]] })

      this.map = this._highchartsService.draMap("mapPlot", data)
    })
  }

  openMap() {
    this.map.reflow()
  }


}
