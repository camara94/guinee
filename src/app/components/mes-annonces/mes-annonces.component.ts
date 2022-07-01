import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';
import { baseURL } from './../../shared/baseurl';
import { Category } from './../../shared/modeles/category';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {

  produitsParUser: Produit[]= [];
  prodError: any;
  query: string = ''

  category: Category;
  catError: any;

  pageSize: number = 6;
  page: number = 1;

  baseURL: string = baseURL;

  constructor(
    private produitService:ProduitService,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('id');
    this.produitService
        .getProduitParUser(idUser)
        .subscribe( 
          produits => { 
            this.produitsParUser = produits; 
          },
          err => this.prodError = err,
          () => {}
         );
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }
  searchProduit(query) {
    this.router.navigate(['produits'], { queryParams: { query: query } });
  }

}
