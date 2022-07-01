import { Component, OnInit } from '@angular/core';
import { LigneCommande } from './../../shared/modeles/ligneCommande';
import { LigneCommandeService } from './../../services/ligne-commande.service';
import { ActivatedRoute } from '@angular/router';
import { baseURL } from './../../shared/baseurl';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  commande: any;
  baseURL: string = baseURL;
  constructor(
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ligneCommandeService
        .getAllCommandes(id)
        .subscribe(
          cmd => {
            this.commande=cmd;
            console.log(cmd)
          }
        )
  }

  updatePanier(ligneCommande: LigneCommande) {
    ligneCommande.livrer = true;
    this.ligneCommandeService
        .updateLigneCommande(ligneCommande._id, ligneCommande)
        .subscribe(
          cmd => {
            location.reload;
          }
        )
  }

}
