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
  { metrica: "valor_enade", title: "Distribuição do conceito de curso ENADE", subtitle: "Brasil, 2019" },
]

@Component({
  selector: 'app-output',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnChanges {

  @Input() metricaSelecionada = 'qt_vagas_autorizadas';
  @Input() cruzamentoSelecionado = '';
  @Input() estadosSelecionados: any[] = [];
  dataPlot = []
  map;

  constructor(private _dataService: DataService, private _highchartsService: HighchartsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metricaSelecionada'] && changes['metricaSelecionada'].previousValue != changes['metricaSelecionada'].currentValue) {
      const prev = changes['metricaSelecionada'].previousValue
      this.drawMap(this.metricaSelecionada)

      if(prev == undefined){
        this.getData(this.metricaSelecionada)
      } else {
        this.drawPlot(this.metricaSelecionada)
      }
    }
    if (changes['estadosSelecionados'] && changes['estadosSelecionados'].previousValue != changes['estadosSelecionados'].currentValue) {
      const prev = changes['estadosSelecionados'].previousValue,
          current = changes['estadosSelecionados'].currentValue;

      if(prev != undefined){
        const novaLocalizacao = current.filter(x => !prev.map(d => d.nome).includes(x.nome));

        if(novaLocalizacao.length > 0) {
          this.getData(this.metricaSelecionada, novaLocalizacao[0])
        } else {
          const removeLocalizacao = prev.filter(x => !current.map(d => d.nome).includes(x.nome));
          const index = this.dataPlot.findIndex(d => d.nome == removeLocalizacao[0].nome)
          this.dataPlot.splice(index, 1)
          this.drawPlot(this.metricaSelecionada)
        }

      }
      
    }
  }

  drawPlot(metrica) {
    var metadata = titles.filter(d => d.metrica == metrica)[0];
    this._highchartsService.drawHistogram("plotData", this.formatData(this.dataPlot, metrica), metadata)
  }

  getData(metrica, estado = null, cruzamento = null) {
    const filter = estado === null ? null : estado.sigla
    const nome = estado === null ? "Brasil" : estado.nome

    this._dataService.getCardData(filter).subscribe(data => {
      data["nome"] = nome;
      this.dataPlot.push(data);
      this.drawPlot(metrica)
    })

  }

  formatData(data, metrica) {
    var result = [];
    data.forEach(d => {
      result.push({
        name: d.nome,
        data: [d[metrica]]
      })
    })

    return result;
  }

  drawMap(metrica){
    this._dataService.getMapData().subscribe((json: any) => {
      let dataEstados = json.map(d => { return { municipio: d.uf, qt_cursos: d[metrica] } }).sort((a, b) => b[metrica] - a[metrica]);
      let data = json.map(d => { return ['br-' + d.uf.toLowerCase(), d[metrica]] })

      this.map = this._highchartsService.draMap("mapPlot", data)
    })
  }

  openMap(){
    console.log("oi")
    this.map.reflow()
  }


}
