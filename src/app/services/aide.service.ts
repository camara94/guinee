import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aide } from './../shared/modeles/aide';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AideService {

  constructor(private httpClient: HttpClient) { }

  getAllAides(): Observable<Aide[]> {
    return this.httpClient.get<Aide[]>(baseURL + 'aides')
  }

  getAideId(id: string): Observable<Aide> {
    return this.httpClient.get<Aide>(baseURL + 'aides/' + id)
  }

}
