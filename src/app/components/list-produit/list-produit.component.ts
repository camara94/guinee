import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from './../../services/boutique.service';
import { ProduitService } from './../../services/produit.service';
import { Boutique } from './../../shared/modeles/boutique';
import { Produit } from './../../shared/modeles/produit';
import { Router, ActivatedRoute } from '@angular/router';
import { baseURL } from './../../shared/baseurl';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupprimerProduitComponent } from './../supprimer-produit/supprimer-produit.component';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {

  modalRef: MDBModalRef | null = null;

  boutique: Boutique;
  erreur: any;
  produits: Produit[];
  baseURL: string = baseURL;
  idBoutique: string;
  constructor(
    private boutiqueService: BoutiqueService,
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    private modalService2: NgbModal
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      900: {
        items: 4
      }
    },
    nav: false
  };


  ngOnInit(): void {
    this.idBoutique = this.route.snapshot.paramMap.get('id');
    console.log(this.idBoutique)
    this.boutiqueService
        .getBoutiqueById(this.idBoutique)
        .subscribe(
          boutique => this.boutique = boutique,
          erreur => this.erreur = erreur
        )

    this.produitService
        .getProduitProuitByBoutique(this.idBoutique)
        .subscribe(
          produits => {
            this.produits = produits;
            console.log(this.produits)
          },
          erreur => this.erreur = erreur
        )
  }

  openModal(id: string) {
    const ref = this.modalService2.open(SupprimerProduitComponent);
    ref.componentInstance.id = id;
  }

}
