import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panier } from './../shared/modeles/panier';
import { Observable } from 'rxjs';
import { baseURL } from './../shared/baseurl';
import { LigneCommande } from './../shared/modeles/ligneCommande';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  
  constructor(private httpClient: HttpClient) { }

  getPanier(): Observable<Panier> {
    return this.httpClient.get<Panier>(baseURL + 'paniers')
  }

  ajouterPanier(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.httpClient.post<LigneCommande>(baseURL + 'paniers/add', ligneCommande);
  }

  deletePanier(id: string): Observable<Panier>{
    return this.httpClient.delete<Panier>(baseURL + "panier/"+ id);
  }

  udpatePanier(panier: Panier): Observable<Panier> {
    return this.httpClient.put<Panier>(baseURL + 'paniers', panier);
  }

  

}
