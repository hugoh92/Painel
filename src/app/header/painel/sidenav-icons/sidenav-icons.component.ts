import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {
  data: any = {}

  constructor(public _sidebarService: SidebarService, public router: Router, private _dataService: DataService) { 
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.getData(event.url.slice(-2))
      }

      if (event instanceof NavigationError) {
      }

    })
  }

  ngOnInit(): void {
    this.getData(this.router.url.slice(-2));
  }

  getData(filter = null){
    this._dataService.getCardData(filter).subscribe((json:any) => {
      this.data = json
    })
  }
 


}
