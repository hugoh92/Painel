import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HighchartsService } from 'src/app/services/highcharts.service';

class Metadata {
  metrica: string;
  title: string;
  subtitle: string;
}

var titles: Array<Metadata> = [
  {metrica: "qt_vaga_total", title:"Distribuição do quantitativo de vagas.", subtitle:"Brasil, 2019"},
  {metrica: "qt_inscrito_total", title:"Distribuição do número de inscritos.", subtitle:"Brasil, 2019"},
  {metrica: "qt_ingresso_total", title:"Distribuição do número de ingressos.", subtitle:"Brasil, 2019"},
  {metrica: "qt_matricula_total", title:"Distribuição do número de matrículas.", subtitle:"Brasil, 2019"},
  {metrica: "qt_concluinte_total", title:"Distribuição do número de concluintes.", subtitle:"Brasil, 2019"},
  {metrica: "qt_docentes_total", title:"Distribuição do número de docentes.", subtitle:"Brasil, 2019"},
  {metrica: "tx_concorrencia", title:"Distribuição da taxa de concorrência.", subtitle:"Brasil, 2019"},
  {metrica: "tx_ocupacao", title:"Distribuição da taxa de ocupação.", subtitle:"Brasil, 2019"},
  {metrica: "valor_enade", title:"Distribuição do conceito de curso ENADE", subtitle:"Brasil, 2019"},
]

@Component({
  selector: 'app-output',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnChanges {

  @Input() metricaSelecionada = '';
  @Input() cruzamentoSelecionado = '';
  dataPlot = [];

  constructor(private _dataService: DataService, private _highchartsService: HighchartsService) { }

  ngOnChanges(changes: SimpleChanges): void{
    this.drawPlot(this.metricaSelecionada)
  }

  drawPlot(metrica, cruzamento = null){
    this._dataService.getIndicadoresData(metrica).subscribe((data : any) => {
      this.dataPlot = data.map(d => d[metrica])
      let metadata = titles.find(t => t.metrica == metrica)
      this._highchartsService.drawHistogram("plotData", this.dataPlot, metadata)

    })

  }

}
