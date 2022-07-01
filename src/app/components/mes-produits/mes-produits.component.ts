import { Component, OnInit } from '@angular/core';
import { Produit } from './../../shared/modeles/produit';
import { Category } from './../../shared/modeles/category';
import { Boutique } from './../../shared/modeles/boutique';
import { baseURL } from './../../shared/baseurl';
import { BoutiqueService } from './../../services/boutique.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LigneCommandeService } from './../../services/ligne-commande.service';
import { LigneCommande } from 'src/app/shared/modeles/ligneCommande';
import { PanierService } from './../../services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-mes-produits',
  templateUrl: './mes-produits.component.html',
  styleUrls: ['./mes-produits.component.css']
})
export class MesProduitsComponent implements OnInit {

  produitsParBoutique: Produit[]=[];
  prodError: any;

  boutique: Boutique;

  category: Category;
  catError: any;

  query: string = ''

  pageSize: number = 3;
  page: number = 1;

  baseURL: string = baseURL;

  constructor(
    private boutiqueService:BoutiqueService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    private ligneCommandeService: LigneCommandeService,
    private panierService: PanierService,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    const idBoutique = this.route.snapshot.paramMap.get('id');
    this.boutiqueService
        .getProduitParBoutique(idBoutique)
        .subscribe( 
          produits => { 
            this.produitsParBoutique = produits; 
          },
          err => this.prodError = err,
          () => {}
         );

      this.boutiqueService
          .getBoutiqueById(idBoutique)
          .subscribe(
            boutique => {
              this.boutique = boutique;
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

  ajouterProduitDansBoutique() {
    this.router.navigate(['ajouter-dans-boutique/' + this.boutique._id])
  }

  addPanier(produit: Produit, quantite: number) {
    let ligneCommandes: LigneCommande[] = [];
    ligneCommandes.push(
      {
        produit: produit, 
        quantite: quantite,
        commander: false
      } as LigneCommande);
      
      produit.quantite -=1;

      this.produitService
          .updateProduit(produit._id, produit)
          .subscribe(p=>produit=p);

      this.ligneCommandeService
          .ajouterLigneCommande(ligneCommandes[0])
          .subscribe(
            commande => {
              this.panierService
                  .ajouterPanier(commande)
                  .subscribe( 
                    panier => { 
                      this.router.navigateByUrl("/panier");
                    },
                    error => console.error(error)
                  )
            },
            error => console.error(error)
          );
  }

}
