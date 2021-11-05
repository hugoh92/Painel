import { Component, OnInit, Renderer2 } from '@angular/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.scss'],
  
})


  
export class DataExplorerComponent implements OnInit {
  metricaSelecionada = "qt_vaga_total";
  cruzamentoSelecionado = "cat_admin";

  currentCheckedValue = null;
  constructor(private ren: Renderer2) { } 

  ngOnInit(): void {
  }

  chosenYearHandler(ev, input){
    let { _d } = ev;
    input._destroyPopup()
  }



  checkState(el) {
    setTimeout(() => {
      console.log(el)
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
      } else {
        this.currentCheckedValue = el.value
      }
    })
  }

}
