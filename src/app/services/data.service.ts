import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  autoCompleteOpts = [];

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
    let url = 'http://35.188.71.6/api/curso/?format=json&query=%7Bsigla_da_ies%2Cnome_da_ies%2Ccodigo_curso%2Cuf%2Cmunicipio%2Cnome_do_curso%7D'
    return this.autoCompleteOpts.length ?
      of(this.autoCompleteOpts) :
      this.http.get<any>(url).pipe(tap(data => this.autoCompleteOpts = data))
  }
  
}
