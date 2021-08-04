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
  apiUrl = 'https://django-direm.herokuapp.com/api/';
  apiUrl2 =  'http://warm-everglades-94375.herokuapp.com/';

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
    let url = `${this.apiUrl2}api/buscador`
    return this.autoCompleteOpts.length ?
      of(this.autoCompleteOpts) :
      this.http.get<any>(url).pipe(tap(data => this.autoCompleteOpts = data))
  }

  getPlot1Data(filter = null){
    let url = filter === null || filter == 'el' ||  filter == '/' ? `${this.apiUrl2}grafico_1`:  `${this.apiUrl2}grafico_1/${filter}`;
    return this.http.get(url);
  }

  getPlot2Data(filter = null){
    let url = filter === null || filter == 'el' ||  filter == '/' ? `${this.apiUrl2}grafico_2`:  `${this.apiUrl2}grafico_2/${filter}`;
    return this.http.get(url);
  }

  getCardData(filter = null){
    let url = filter === null || filter == 'el' ||  filter == '/' ? `${this.apiUrl2}cards`:  `${this.apiUrl2}cards/${filter}`;
    return this.http.get(url);
  }

  getMapData(filter = null){
    let url = filter === null || filter == 'el' ||  filter == '/' ? `${this.apiUrl2}mapa`:  `${this.apiUrl2}mapa/${filter}`;
    return this.http.get(url);
  }

  getLocalizacaoData(filter = null){
    let url = filter === null || filter == 'el' ||  filter == '/' ? `${this.apiUrl2}localizacao`:  `${this.apiUrl2}localizacao/${filter}`;
    return this.http.get(url);
  }

  
}
