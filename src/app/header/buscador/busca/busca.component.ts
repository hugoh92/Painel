import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  emailFormControl = new FormControl('');
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any>;

  constructor(private _dataService: DataService) {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this._filter(val || '')
      })       
    );
  } 

  ngOnInit() {

  }

  // filter and return the values
  _filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this._dataService.getAutocompleteOptions()
     .pipe(
       map((response: any) => response.filter(option => { 
         return option.nome_da_ies.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   } 

}
