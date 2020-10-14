import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  autoCompleteOpts = [];
  apiUrl = 'https://jequiecovid19.com/api/';

  constructor(private http: HttpClient) { }

  /**
   * Get a Data
   * @param {string} path Name of the file
   * @returns a http requisition of the path
   * 
  */
  getData(path){
    return this.http.get(path)
  }

  getAutocompleteOptions() {
    let url = `${this.apiUrl}curso/?format=json&query=%7Bsigla_da_ies%2Cnome_da_ies%2Ccodigo_curso%2Cuf%2Cmunicipio%2Cnome_do_curso%7D`
    return this.autoCompleteOpts.length ?
      of(this.autoCompleteOpts) :
      this.http.get<any>(url).pipe(tap(data => this.autoCompleteOpts = data))
  }

  getPlot1Data(filter = null){
    let url = filter === null || filter == 'el' ? `${this.apiUrl}grafico_1`:  `${this.apiUrl}grafico_1/${filter}`;
    return this.http.get(url);
  }

  getPlot2Data(filter = null){
    let url = filter === null || filter == 'el' ? `${this.apiUrl}grafico_2`:  `${this.apiUrl}grafico_2/${filter}`;
    return this.http.get(url);
  }

  getCardData(filter = null){
    let url = filter === null || filter == 'el' ? `${this.apiUrl}cards`:  `${this.apiUrl}cards/${filter}`;
    return this.http.get(url);
  }

  getMapData(filter = null){
    let url = filter === null || filter == 'el' ? `${this.apiUrl}mapa`:  `${this.apiUrl}mapa/${filter}`;
    return this.http.get(url);
  }

  getLocalizacaoData(filter = null){
    let url = filter === null || filter == 'el' ? `${this.apiUrl}localizacao`:  `${this.apiUrl}localizacao/${filter}`;
    return this.http.get(url);
  }
  
}
