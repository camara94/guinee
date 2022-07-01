import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from './../../services/boutique.service';
import { Boutique } from './../../shared/modeles/boutique';
import { baseURL } from './../../shared/baseurl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boutiques',
  templateUrl: './boutiques.component.html',
  styleUrls: ['./boutiques.component.css']
})
export class BoutiquesComponent implements OnInit {

  page: number = 1;
  pageSize: number = 2;
  boutiques: Boutique[] = [];
  baseURL: string = baseURL;
  user: any;
  boutiqueErreur:any;
  
  constructor(
    private boutiqueService: BoutiqueService,
    private router: Router
  ) { 
    this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {
    this.boutiqueService
        .getAllBoutiques()
        .subscribe(
          boutiques => {
            this.boutiques = boutiques;
            console.log(boutiques)
          },
          error => this.boutiqueErreur = error
        )
  }

  mesProduits(id: string) {
    this.router.navigate(['boutiques/' + id])
  }

}
