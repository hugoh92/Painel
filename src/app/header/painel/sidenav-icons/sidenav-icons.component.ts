import { Component, OnInit } from '@angular/core';
import { timers } from 'jquery';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {

  constructor(public _sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

}
