import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from './../shared/modeles/produit';
import { Observable } from 'rxjs';
import { baseURL } from './../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private httpClient: HttpClient) { }

  getAllProduits(): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + 'produits')
  }

  
  createProduit(produit: any): Observable<Produit> {
    return this.httpClient.post<Produit>( baseURL + 'produits', produit );
  }

  getProduitId(id: string): Observable<Produit> {
    return this.httpClient.get<Produit>(baseURL + 'produits/' + id)
  }
  getProduitParUser(idUser: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + "produits/users/"+ idUser);
  }

  getProduitParCategory(idCategory: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + "produits/categories/"+ idCategory);
  }

  updateProduit(idProduit: string, produit: Produit): Observable<Produit> {
    return this.httpClient.put<Produit>( baseURL + 'produits/' + idProduit, produit );
  }

  searchProduit(designation: string, idVille: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + "produits/search?designation="+ designation + "&ville=" + idVille );
  }

  getProduitProuitByBoutique(idBoutique: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(baseURL + 'produits/boutiques/' + idBoutique)
  }

  deleteProduit(id: string): Observable<Produit> {
    return this.httpClient.delete<Produit>(baseURL + "produits/"+id);
  }

  //Les methodes de création ici
  public telecharger(file: File): Observable<string> {
    let formData = new FormData();
    formData.append('image', file);
    console.log(formData);
    return this.httpClient.put<string>(baseURL + "produits", formData);
  }

  rechercherProduits(titre: string):Observable<any>{
    return this.httpClient.get<any>(baseURL +"produits/va/recherches?titre="+ titre);
  }


  
  rechercheProduit(fichier:File): Observable <any>{
    let formData: FormData =new FormData();
    formData.append("file",fichier);
    return this.httpClient.post<any>("http://localhost:5000/fichiers",formData);
  }

}
