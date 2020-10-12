import { Component, OnInit } from '@angular/core';
import { timers } from 'jquery';
import { DataService } from 'src/app/services/data.service';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {

  constructor(public _sidebarService: SidebarService, private _dataService: DataService) { }

  ngOnInit(): void {
    this._dataService.getData(`http://api.direm.org/api/curso/`).subscribe(json =>{
      console.log(json);  
    })
  }

}
