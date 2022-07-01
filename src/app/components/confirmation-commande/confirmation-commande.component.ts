import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LigneCommande } from './../../shared/modeles/ligneCommande';


@Component({
  selector: 'app-confirmation-commande',
  templateUrl: './confirmation-commande.component.html',
  styleUrls: ['./confirmation-commande.component.css']
})
export class ConfirmationCommandeComponent implements OnInit {

  cmd: LigneCommande;
  @Input() fromParent;
  
  erreur: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  reload(){
    location.reload();
  }
  ngOnInit(): void {
    this.cmd = this.data.cmd;
    console.log(this.cmd);
  }

}
