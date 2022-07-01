import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandeOuvertureBoutique } from './../shared/modeles/demandeOuvertureBoutique';
import { Observable } from 'rxjs';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DemandeOuvertureBoutiqueService {

  constructor(private httpClient: HttpClient) { }

  getAllDemandeOuvertureBoutiques(): Observable<DemandeOuvertureBoutique[]> {
    return this.httpClient.get<DemandeOuvertureBoutique[]>(baseURL + 'demandes')
  }

  getDemandeOuvertureBoutiqueId(id: string): Observable<DemandeOuvertureBoutique> {
    return this.httpClient.get<DemandeOuvertureBoutique>(baseURL + 'demandes/' + id)
  }

  createDemandeOuvertureBoutique(demandeOuvertureBoutique: DemandeOuvertureBoutique): Observable<DemandeOuvertureBoutique> {
    return this.httpClient.post<DemandeOuvertureBoutique>(baseURL + 'demandes', demandeOuvertureBoutique);
  }


}
