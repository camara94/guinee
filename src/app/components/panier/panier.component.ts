import { Component, OnInit } from '@angular/core';
import { Panier } from './../../shared/modeles/panier';
import { PanierService } from './../../services/panier.service';
import { baseURL } from './../../shared/baseurl';
import { Produit } from './../../shared/modeles/produit';
import { LigneCommande } from 'src/app/shared/modeles/ligneCommande';
import { LigneCommandeService } from './../../services/ligne-commande.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupprimerPanierComponent } from './../supprimer-panier/supprimer-panier.component';
import { ConfirmationCommandeComponent } from './../confirmation-commande/confirmation-commande.component';
import { NotificationService } from './../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  
  panier: Panier;
  erreur: any;
  baseURL: string = baseURL;
  sousTaux: number=0;
  tva: number = 0;
  totaux: number = 0;

  constructor(
    private panierService: PanierService,
    private ligneCommandeService: LigneCommandeService,
    private modalService2: NgbModal,
    private notificationService:NotificationService,
    private dialog: MatDialog,
    private produitService: ProduitService
    ) { }

  ngOnInit(): void {

    this.panierService
        .getPanier()
        .subscribe(
          panier => {
            this.panier = panier;
            if(panier != null)
              this.panier
                  .ligneCommandes
                  .forEach( cmd => {
                    this.totaux += cmd.quantite * cmd.produit.prix;
                  } );
               //this.tva = ( (this.sousTaux * 18) / 100) - this.totaux;
          },
          erreur => this.erreur = erreur
        )
  }

  updateLigneCommandePanier(cmd) {
   
    this.ligneCommandeService
        .updateLigneCommande(cmd._id, cmd)
        .subscribe(
          panier => {
            this.panierService
                .getPanier()
                .subscribe(
                  panier => {
                    this.panier = panier;
                    if(panier != null)
                      this.panier
                          .ligneCommandes
                          .forEach( cmd => {
                            this.totaux += cmd.quantite * cmd.produit.prix;
                          } );
                  },
                  erreur => this.erreur = erreur
                )
          }
        )
  }

  deletLigneCommandePanier(cmd) {
    this.ligneCommandeService
    .deleteLigneCommande(cmd._id)
    .subscribe(
      panier => {
        this.panierService
    .getPanier()
    .subscribe(
      panier => {
        this.panier = panier;
        if(panier != null)
          this.panier
              .ligneCommandes
              .forEach( cmd => {
                this.totaux += cmd.quantite * cmd.produit.prix;
                location.reload();
              } );
      },
      erreur => this.erreur = erreur
    )
      }
    )
  }


  increase( p: Produit, cmd: LigneCommande) {
   if (cmd.produit.quantite>0) {
      cmd.quantite += 1;
      cmd.produit.quantite -=1;
      this.updateLigneCommandePanier(cmd)
      this.produitService
      .updateProduit(p._id, cmd.produit)
      .subscribe(prod=>cmd.produit=prod)
    } 

   
  };
  decrement(cmd: LigneCommande) {
   
    if (cmd.quantite > 0) {
      cmd.quantite -= 1;
      this.updateLigneCommandePanier(cmd);

    let p = cmd.produit;
    cmd.produit.quantite +=1;
    this.produitService
        .updateProduit(p._id, cmd.produit)
        .subscribe(prod=>cmd.produit=prod)
    }
  }

  openModal(id: string) {
    const ref = this.modalService2.open(SupprimerPanierComponent);
    ref.componentInstance.id = id;
  }


  commander(cmd: LigneCommande) {
    this.getNotification(cmd._id)
    cmd.commander = true;
    this.updateLigneCommandePanier(cmd);
    const dialogRef = this.dialog.open( ConfirmationCommandeComponent, {
      width: '540px',
      height: '290px',
      position: {
        top: "5%"
      },
      data: {
        cmd: cmd
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
    
  }

  annuler(cmd: LigneCommande) {
    cmd.commander = false;
    this.updateLigneCommandePanier(cmd);
  }


  /*updatePanier(panier: Panier) {
    panier.ligneCommandes
          .map(cmd => {
            this.updateLigneCommandePanier(cmd);
          })
          this.openModal2(panier);
    if(panier.commander==false) {
      panier.commander = true;
      this.panierService
          .udpatePanier(panier)
          .subscribe(
            panier => { 
              this.panier = panier;
              alert("BONJOUR")
             
              //location.reload();
            }
          )
    }
  }*/

  openModalConfirme(contact: string) {
    const ref = this.modalService2.open(ConfirmationCommandeComponent);
    ref.componentInstance.contact = contact;
  }

  openModal2(cmd: LigneCommande) {
    const modalRef = this.modalService2.open(ConfirmationCommandeComponent,
      { 
        scrollable: true,
        windowClass: 'myCustomModalClass'
      });
      

    let data = cmd;
    modalRef.componentInstance.fromParent = data;

    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  getNotification(id: string){
    this.notificationService
        .ajouterNotification(id)
        .subscribe(data=>{
          console.log(data)
        })
  }


  openDialog(panier: Panier): void {
    const dialogRef = this.dialog.open( ConfirmationCommandeComponent, {
      width: '540px',
      height: '290px',
      position: {
        top: "5%"
      },
      data: {
        panier: panier
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
