import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidenavOptions;
  public sidenavInfo;


  public open(sidenav) {
    return sidenav.open();
  }


  public close(sidenav) {
    return sidenav.close();
  }

  public toggle(sidenav: string): void {

    if(window.innerWidth >806){
      this.sidenavInfo.toggle();
      this.sidenavOptions.toggle();
    } else {
      this[sidenav].toggle()
    }
  }
}
