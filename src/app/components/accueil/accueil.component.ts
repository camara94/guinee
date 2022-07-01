import { Component, OnInit } from '@angular/core';
import { Category } from './../../shared/modeles/category';
import { CategoryService } from './../../services/category.service';
import { baseURL } from './../../shared/baseurl';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateIn: true,
    animateOut: true,
    autoplay: true,
    navSpeed: 200,
    navText: ['', ''],
    nav: false
  };

  images: number[]=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  categories: Category[]=[];
  produits: Produit[] = [];
  catError: any;
  prodError: any;
  baseURL: string = baseURL;
  pageSize: number = 8;
  page: number = 1;
  k: number = 0;

  randomIndex: number = Math.random();
  constructor(
    private categoryService: CategoryService,
    private produitService: ProduitService,
    private router: Router
  ) {
      
   }

 
  ngOnInit(): void {
    this.categoryService
        .getAllCategories()
        .subscribe( 
          categories => {this.categories = categories;},
          error => this.catError = error,
          ()=>{}
         );

    this.produitService
        .getAllProduits()
        .subscribe( 
          produits => { 
            this.produits = produits; 
            this.randomIndex = Math.round(Math.random()*(this.produits.length-1));
          },
          error => this.prodError=error,
          ()=>{}
        );
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }

  searchProduit(query) {
    this.router.navigate(['produits'], { queryParams: { query: query } });
  }
  
}
