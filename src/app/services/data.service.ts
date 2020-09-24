import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

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
}
