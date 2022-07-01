import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boutique } from './../shared/modeles/boutique';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { Produit } from './../shared/modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  constructor(private httpClient: HttpClient) { }

  getAllBoutiques(): Observable<Boutique[]> {
    return this.httpClient.get<Boutique[]>(baseURL + 'boutiques')
  }

  getBoutiqueById(id: string): Observable<Boutique> {
    return this.httpClient.get<Boutique>(baseURL + 'boutiques/' + id)
  }

  getProduitParBoutique(idBoutique: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + "boutiques/produits/"+ idBoutique);
  }

  getProduitParUser(): Observable<Boutique[]> {
    return this.httpClient.get<Boutique[]>(baseURL + "boutiques/shop-by-user");
  }

  updateBoutique(id: string, boutique: Boutique): Observable<Boutique> {
    return this.httpClient.put<Boutique>(baseURL + "boutiques/"+id, boutique);
  }
}
