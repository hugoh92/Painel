import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-sidenav-est',
  templateUrl: './sidenav-est.component.html',
  styleUrls: ['./sidenav-est.component.scss']
})
export class SidenavEstComponent implements OnInit, OnDestroy {
  stateOptions;
  subscription;

  constructor(private _dataService: DataService, public router: Router, public _sidebarService: SidebarService) { 
    this.subscription = this._dataService.getData("./assets/data/state_list.json").subscribe(json => {
      this.stateOptions = json;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {

  }
  

  /**
   * Return flag to maintain opened modal of active route
   * @param {string} regiao a json containaing data from region
   * @returns returns true if the active route is from the current region
   * 
  */
  openedModal(regiao){
    // Lista as siglas dos estados da regiao
    var siglas = regiao.estados.map(d => d.sigla);
    // Retorna true se a url ativa é um estado da região

    return siglas.includes(this.router.url.slice(-2))
  }

  /**
   * Sort Json by Key
   * @param {string} json a json
   * @param {string} keyToSort a string with the name of a key to sort
   * @returns a json sorted
   * 
  */
  sortData(json: any, keyToSort: string){
    return json.sort((a, b) => {a[keyToSort] - b[keyToSort]});
 }
}
