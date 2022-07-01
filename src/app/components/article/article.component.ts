import { Component, OnInit } from '@angular/core';
import { Category } from './../../shared/modeles/category';
import { CategoryService } from './../../services/category.service';
import { baseURL } from './../../shared/baseurl';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  categories: Category[]=[];
  produits: Produit[] = [];
  catError: any;
  prodError: any;
  baseURL: string = baseURL;
  pageSize: number = 12;
  page: number = 1;

  produitParCategories: any[]=[] ;

  randomIndex: number = Math.round(Math.random());
  constructor(
    private categoryService: CategoryService,
    private produitService: ProduitService
  ) {
    
   }

  ngOnInit(): void {

    this.produitService
        .getAllProduits()
        .subscribe( 
          produits => {
            this.produits = produits;
          }
        )

    this.categoryService
        .getAllCategories()
        .subscribe( 
          categories => {
            this.categories.forEach(cat=>{
              this.produitService
                  .getProduitParCategory(cat._id)
                  .subscribe(pc => {
                    if(pc.length>0)
                      this.produitParCategories[cat.nom] = pc;
                  })
            })
          },
          error => this.catError = error,
          ()=>{}
         );
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }
  
}

