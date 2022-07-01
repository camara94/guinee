import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Panier } from './../../shared/modeles/panier';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PanierService } from './../../services/panier.service';
import { LigneCommandeService } from './../../services/ligne-commande.service';

@Component({
  selector: 'app-supprimer-panier',
  templateUrl: './supprimer-panier.component.html',
  styleUrls: ['./supprimer-panier.component.css']
})
export class SupprimerPanierComponent implements OnInit {

  @Input() public id;
  modalRef: MDBModalRef | null = null;
  
  panier:Panier;
  erreur: any;

  constructor(
    public ref: NgbModal,
    public activeModal: NgbActiveModal,
    private panierService: PanierService,
    private ligneCommandeService: LigneCommandeService
  ) { }

  ngOnInit(): void {
   this.panierService
       .getPanier()
       .subscribe(
         panier => this.panier = panier,
         erreur => this.erreur = erreur
       )
  }

  relance(){
    this.activeModal.close(this.id);
    location.reload()
  }

  supprimerPanier(){
    this.panier.ligneCommandes
        .forEach(cmd=>{
          this.ligneCommandeService
              .deleteLigneCommande(cmd._id)
              .subscribe(p=>{})
        })

    if(this.panier != undefined && this.panier.ligneCommandes.length == 0) {
      this.panierService
        .deletePanier(this.id)
        .subscribe(
          panier => {
            this.relance()
          },
          erreur => this.erreur = erreur,
          ()=>{
            location.reload();
          }
        )
    }
    this.relance()
  }

}
