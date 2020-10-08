import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { routeTransitionAnimations } from './route-transition-animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'painelMed';

  constructor() { }

  ngAfterViewInit() {

  }
}
