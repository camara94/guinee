import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { Ville } from './../shared/modeles/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  constructor(private httpClient: HttpClient) { }

  getAllVilles(): Observable<Ville[]> {
    return this.httpClient.get<Ville[]>(baseURL + 'villes')
  }

  getVilleByRegion(idRegion: string): Observable<Ville> {
    return this.httpClient.get<Ville>(baseURL + 'villes/regions/' + idRegion)
  }

  getVilleId(id: string): Observable<Ville> {
    return this.httpClient.get<Ville>(baseURL + 'villes/' + id)
  }

  addVille(Ville: Ville): Observable<Ville> {
    return this.httpClient.post<Ville>(baseURL + 'villes/', Ville)
  }

}

