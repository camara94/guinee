import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from './../../services/boutique.service';
import { Boutique } from './../../shared/modeles/boutique';
import { baseURL } from './../../shared/baseurl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-boutiques',
  templateUrl: './mes-boutiques.component.html',
  styleUrls: ['./mes-boutiques.component.css']
})
export class MesBoutiquesComponent implements OnInit {
  boutiques: Boutique[];
  baseURL: string = baseURL;
  erreur: any;
  constructor(
    private boutiqueService: BoutiqueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.boutiqueService
        .getProduitParUser()
        .subscribe(
          boutiques => {this.boutiques = boutiques },
          erreur => this.erreur = erreur
        )
  }

  mesCommandes(idUser, idCommande) {
    this.router.navigate(['liste-commande'], { queryParams: { idUser: idUser, idCommande: idCommande } });
  }


}
