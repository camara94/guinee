import { Component, OnInit, Output, Input } from '@angular/core';
import { Panier } from './../../shared/modeles/panier';
import { PanierService } from './../../services/panier.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {


  addclass: string;
  constructor(
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
  }
  /**
   * Router activation
   */
  onActivate(componentReference: any) {
    this.addclass = componentReference.navClass;
  }

}
