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

  constructor(private loaderService: LoaderService, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'cursor-loader');
      } else {
        this.renderer.removeClass(document.body, 'cursor-loader');
      }
    });
  }
}
