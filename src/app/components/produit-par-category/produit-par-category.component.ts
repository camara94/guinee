import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';
import { baseURL } from './../../shared/baseurl';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../shared/modeles/category';

@Component({
  selector: 'app-produit-par-category',
  templateUrl: './produit-par-category.component.html',
  styleUrls: ['./produit-par-category.component.css']
})
export class ProduitParCategoryComponent implements OnInit {

  produitsParCategory: Produit[]=null;
  prodError: any;

  category: Category;
  catError: any;

  query: string = '';

  pageSize: number = 4;
  page: number = 1;

  baseURL: string = baseURL;

  constructor(
    private produitService:ProduitService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idCategory = this.route.snapshot.paramMap.get('id');
    this.produitService
        .getProduitParCategory(idCategory)
        .subscribe( 
          produits => { 
            this.produitsParCategory = produits; 
          },
          err => this.prodError = err,
          () => {}
         );

      this.categoryService
          .getCategoryId(idCategory)
          .subscribe(
            category => {
              this.category = category;
            },
            err => this.catError = err,
            () => {}
          )
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }

  searchProduit(query) {
    this.router.navigate(['produits'], { queryParams: { query: query } });
  }

}
