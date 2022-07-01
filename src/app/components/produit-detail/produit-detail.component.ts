import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperOptions } from 'swiper';
import { Produit } from './../../shared/modeles/produit';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from './../../services/produit.service';
import { baseURL } from './../../shared/baseurl';
import { PanierService } from './../../services/panier.service';
import { LigneCommande } from './../../shared/modeles/ligneCommande';
import { LigneCommandeService } from './../../services/ligne-commande.service';
import { Panier } from './../../shared/modeles/panier';



@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {

  model = 1;

  produit: Produit;
  prodErr: any;

  afficherAnnonceurInfo: boolean = false;

  produits: Produit[] = [];
  prodsErr: any;
  
  baseURL: string = baseURL;

  quantite: number = 0;
  ownerProduit: boolean = false;

  pageSize: number = 6;
  page: number = 1;

  @Input() panier: Panier;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService,
    private ligneCommandeService: LigneCommandeService,
    private router: Router
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
    if(produit.quantite != 0)
      this.quantite++;
      produit.quantite -= 1;
      this.produitService
          .updateProduit(produit._id, produit)
          .subscribe(prod=>produit = prod)
  }
  decrement(produit: Produit) {
    if(produit.quantite > 0)
      this.quantite--;
      produit.quantite += 1;
      this.produitService
          .updateProduit(produit._id, produit)
          .subscribe(prod=>produit = prod)
  }
  ngOnInit(): void {
    const idProduit = this.route.snapshot.paramMap.get('id');
    let idUser = '';
    if(localStorage.getItem('user') != undefined)
      idUser = JSON.parse(localStorage.getItem('user'))['_id']

    this.produitService
        .getProduitId( idProduit )
        .subscribe(
          produit => {
            this.produit = produit;
            this.getProduitParCategory(this.produit.category);
            if( this.produit.user?._id == idUser ) {
              this.ownerProduit = true;
            }
          },
          err => this.prodErr = err,
          () => {}
        );

        
  }

  addPanier(id: string, quantite: number) {
    let ligneCommandes: LigneCommande[] = [];
    ligneCommandes.push(
      {
        produit:{_id: id} as Produit, 
        quantite: quantite,
        commander: false
      } as LigneCommande);

      this.ligneCommandeService
          .ajouterLigneCommande(ligneCommandes[0])
          .subscribe(
            commande => {
              console.log(commande),
              this.panierService
                  .ajouterPanier(commande)
                  .subscribe( 
                    panier => { 
                      this.router.navigate(['panier']);
                    },
                    error => console.error(error)
                  )
            },
            error => console.error(error)
          );
  }

  tva(produit) {
    return Math.round(produit.prix/90*100)/100;
  }

  getProduitParCategory(id: string) {
    this.produitService
        .getProduitParCategory(id)
        .subscribe(
          produits => {
            this.produits = produits;
          },
          err => this.prodsErr = err,
          ()  => {}
        );
  }

  getProduitById(idProduit: string) {
    this.produitService
        .getProduitId( idProduit )
        .subscribe(
          produit => {
            this.produit = produit;
            this.getProduitParCategory(this.produit.category);
          },
          err => this.prodErr = err,
          () => {}
        );
  }

  vaModifierProduit(idProduit: string) {
    this.router.navigate(['modifier-annonce/' + idProduit]);
  }

  afficherAnnonceurInfoMethode(){
    this.afficherAnnonceurInfo = !this.afficherAnnonceurInfo;
  }

}

