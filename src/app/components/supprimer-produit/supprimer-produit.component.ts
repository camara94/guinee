import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitService } from './../../services/produit.service';
import { Produit } from './../../shared/modeles/produit';

@Component({
  selector: 'app-supprimer-produit',
  templateUrl: './supprimer-produit.component.html',
  styleUrls: ['./supprimer-produit.component.css']
})
export class SupprimerProduitComponent implements OnInit {
  @Input() public id;
  modalRef: MDBModalRef | null = null;
  
  produit: Produit;
  erreur: any;

  constructor(
    public ref: NgbModal,
    public activeModal: NgbActiveModal,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
   this.produitService
       .getProduitId(this.id)
       .subscribe(
         prod => this.produit = prod,
         erreur => this.erreur = erreur
       )
  }

  relance(){
    this.activeModal.close(this.id);
    location.reload()
  }

  supprimerProduit(){
    this.produitService
        .deleteProduit(this.id)
        .subscribe(
          prod => {
            this.produit = prod;
            location.reload();
          },
          erreur => this.erreur = erreur
        )
  }

}
