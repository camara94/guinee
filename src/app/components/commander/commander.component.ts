import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { BoutiqueService } from './../../services/boutique.service';
import { Boutique } from './../../shared/modeles/boutique';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.css']
})
export class CommanderComponent implements OnInit {
  @ViewChild('fform', { static: false }) annonceFormDirective: any;
  //@Input() open: EventEmitter<any> = new EventEmitter();
  id: string;
  boutiqueForm: FormGroup;
  boutiques: Boutique[];
  boutique: Boutique;
  produits: Produit[];
  erreur: any;

 list: any[]=[];

  constructor(
    private boutiqueService: BoutiqueService,
    private produitService: ProduitService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.boutiqueService
        .getAllBoutiques()
        .subscribe(
          prod=>this.boutiques=prod,
          erreur=>this.erreur=erreur
        )
        this.createForm()
  }

  onChange(data?: any) {
   
    console.log(data)
  }

  createForm() {
    this.boutiqueForm = this.formBuilder.group({
      id: ''
    });
  }

  onSubmit() {
    console.log(this.boutiqueForm.value)
    //this.annonceForm.value = this.annonceForm.valueForm.value;
  }
}
