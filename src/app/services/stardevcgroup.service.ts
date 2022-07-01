import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Stardevcgroup } from './../models/stardevcgroup';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class StardevcgroupService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService
  ) {}
  //Les methodes de récuperation
  getStardevcgroups(): Observable<Stardevcgroup[]> {
    return this.httpClient.get<Stardevcgroup[]>( baseURL + 'stardevcgroups')
              .pipe(catchError( this.processHTTPMsgService.handleError ) );
  }

  //Les methodes de récuperation
  createProjet(projet: Projet): Observable<Projet> {
    return this.httpClient.post<Projet>( baseURL + 'projets', projet, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Access-Control-Allow-Methods': 'POST',
           'Access-Control-Allow-Origin': '*'
         })
        }).pipe(catchError( this.processHTTPMsgService.handleError ) );
  }
}
