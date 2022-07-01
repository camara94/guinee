import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { Ideation } from '../models/ideation';

@Injectable({
  providedIn: 'root'
})
export class IdeationService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService
  ) {}
  //Les methodes de récuperation
  getIdeations(): Observable<Ideation[]> {
    return this.httpClient.get<Ideation[]>( baseURL + 'ideations', {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Access-Control-Allow-Methods': 'GET',
           'Access-Control-Allow-Origin': '*'
         })
        }).pipe(catchError( this.processHTTPMsgService.handleError ) );
  }

  //Les methodes de récuperation
  createProjet(ideation: Ideation): Observable<Ideation> {
    return this.httpClient.post<Ideation>( baseURL + 'ideations', ideation, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Access-Control-Allow-Methods': 'POST',
           'Access-Control-Allow-Origin': '*'
         })
        }).pipe(catchError( this.processHTTPMsgService.handleError ) );
  }
}
