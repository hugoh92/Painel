import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {
  @Input() data: any = {}

  constructor(public _sidebarService: SidebarService, public router: Router) { 

  }

  ngOnInit(): void {
  }

 

}
