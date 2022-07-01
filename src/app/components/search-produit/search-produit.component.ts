import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import { Produit } from './../../shared/modeles/produit';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from './../../services/produit.service';
import { baseURL } from './../../shared/baseurl';

@Component({
  selector: 'app-search-produit',
  templateUrl: './search-produit.component.html',
  styleUrls: ['./search-produit.component.css']
})
export class SearchProduitComponent implements OnInit {
  model = 1;

  produit: Produit;
  prodErr: any;

  produits: Produit[] = [];
  produitsSearch: Produit[] = [];
  prodsErr: any;
  recherche: any = {}
  
  baseURL: string = baseURL;

  quantite: number = 0;
  designation: string = '';
  idVille: string = ''

  pageSize: number = 8;
  page: number = 1;

  //noProduit: string = "Aucun produit correspondant à votre recherche !"

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) { }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    navigation: true,
    pagination: false
  };

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

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }

  increase(produit: Produit) {
    if(produit.quantite > this.quantite)
      this.quantite++;
    else
      alert('Quantité insuffisante')
  }
  decrement(produit: Produit) {
    if(this.quantite > 0)
      this.quantite--;
    else
      alert('Vous avez atteint 0')
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.designation = params['designation'];
      this.idVille = params['ville']
      this.designation = (this.designation == null || this.designation == undefined) ? '' : this.designation;
      this.idVille = (this.idVille == null || this.idVille == undefined) ? '' : this.idVille;
      console.log(this.idVille)
      this.produitService
          .searchProduit(this.designation, this.idVille)
          .subscribe(
            produit => {
              this.recherche = produit;
              this.produitsSearch = this.recherche.resultats;
            },
            err => this.prodErr = err,
            () => {}
          );
      });
    this.produitService
        .getAllProduits()
        .subscribe(
          produits => {
            this.produits = produits;
          },
          err => this.prodsErr = err,
          ()  => {}
        );
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }
  searchProduit(query, idVille) {
    query = (query == null || query == undefined) ? '' : query;
    idVille = (idVille == null || idVille == undefined) ? '--' : idVille;
    console.log(idVille)
    this.produitService
        .searchProduit(query, idVille)
        .subscribe(
          produits => {
            this.recherche = produits;
            this.produitsSearch = this.recherche.resultats;
          },
          err => this.prodErr = err,
          () => {}
        );
  }
}
