import { Component, OnInit, Renderer2, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

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
  @ViewChild('brazilOpt') public brazilOpt;

  metricaSelecionada = "qt_vagas_autorizadas";
  cruzamentoSelecionado = null;
  value: number = 2010;
  highValue: number = 2019;
  options = {
    floor: 2010,
    ceil: 2019,
    showTicks: true
  };
  anosSelecionados = [this.value, this.highValue]
  query;

  currentCheckedValue = null;
  subscription: any;
  stateOptions: any;
  modelGroup: any[]; // the selected values
  myForm: FormGroup;

  clearSelection() {
    this.myForm.get('estados').setValue(["Brasil"]);
  }

  constructor(private ren: Renderer2, private _dataService: DataService, private fb: FormBuilder) {
    this.subscription = this._dataService.getData("./assets/data/state_list.json").subscribe((json:any) => {
      this.stateOptions = flattenObject(json);
    })
    this.myForm = this.fb.group({
      estados: new FormControl(["Brasil"])
    })
  }


  ngOnInit(): void {

  }

  chosenYearHandler(ev, input) {
    let { _d } = ev;
    input._destroyPopup()
  }

  updateYear() {
    this.anosSelecionados = [this.value, this.highValue]
  }

  checkState(el) {
    setTimeout(() => {
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
        this.cruzamentoSelecionado = null;
      } else {
        this.currentCheckedValue = el.value
      }
    })
  }

}

export const flattenObject = (obj:any) => {
  const flattened = []
  obj.map(d => {  
    if (d.estados) {
      flattened.push(d)
      flattened.push(...flattenObject(d.estados))
    } else {
      flattened.push(d)
    }
    
  })

  return flattened
  
}

@Pipe({
  name: 'LockFilter'
})

export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();

    let resul = value.filter(function (item) {
      return JSON.stringify(item.nome).toLowerCase().includes(args);
    });
    return resul
  }
}
