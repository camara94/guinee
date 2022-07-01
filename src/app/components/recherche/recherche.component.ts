import { Component, OnInit } from '@angular/core';
import { Produit } from './../../shared/modeles/produit';
import { baseURL } from './../../shared/baseurl';
import { ProduitService } from 'src/app/services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  label: string = "";
  pourcentage: string="";
  image: string="";
  produits: Produit[];
  erreurAnnonce: any;
  page:number=1;
  pageSize: number=5;
  baseURL: string = baseURL;

  constructor(
    private route: ActivatedRoute,
    private produitService:ProduitService
    ) { }

ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    this.label = params['label'];
    this.pourcentage = params["pourcentage"];
    this.image = params["image"];
    this.produitService
         .rechercherProduits(this.label)
        .subscribe(
          response=>{ this.produits = response.produits; console.log(this.produits) },
          erreur => this.erreurAnnonce = erreur
        )
  });
}
}
