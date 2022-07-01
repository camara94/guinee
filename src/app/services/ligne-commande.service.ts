import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCommande } from './../shared/modeles/ligneCommande';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {

  constructor(private httpClient: HttpClient) { }

  getLigneCommande(): Observable<LigneCommande[]> {
    return this.httpClient.get<LigneCommande[]>(baseURL + 'commandes')
  }

  getLigneCommandeById(id: string): Observable<LigneCommande[]> {
    return this.httpClient.get<LigneCommande[]>(baseURL + 'commandes/' + id)
  }

  updateLigneCommande(id: string, ligneCommandes: LigneCommande): Observable<LigneCommande[]> {
    return this.httpClient.put<LigneCommande[]>(baseURL + 'commandes/' + id, ligneCommandes)
  }
  getAllCommandes(id: string): Observable<any> {
    return this.httpClient.get<any>(baseURL + 'paniers/all/' + id);
  }


  deleteLigneCommande(id: string): Observable<LigneCommande> {
    return this.httpClient.delete<LigneCommande>(baseURL + 'commandes/' + id)
  }

  ajouterLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.httpClient.post<LigneCommande>(baseURL + 'commandes', ligneCommande)
  }

}