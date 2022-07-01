import { Component, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Panier } from './shared/modeles/panier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'landrick-angular';
  addclass: string;
  @Output() panier: Panier;

  constructor(private router: Router) {
    /**
     * Unicons icon refreshed on route change.
     */
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        window['Unicons']['refresh']();
      }
    });
  }

  onActivate(componentReference: any) {
    this.addclass = componentReference.navClass;
  }
}
