import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtTokenInterceptorInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;

  constructor(
  ) {

    this.urlsToNotUse= [
      'auth/facebook-aouth2'
    ];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isValidRequestForInterceptor(request.url)) {
      let modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')?.toString()}`
        }
      });
      this.deconnectionAutomatique();

      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = '/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

  deconnectionAutomatique(){
    if(localStorage.getItem('token') != undefined) {
        let user = jwt_decode(localStorage.getItem('token')?.toString()) as any;
        // date d'expiration en millisecond du token
        let timestamp = user.exp * 1000;
        // date courante en millisecond
        let dcurr = Date.now();
        // si les deux timestamp égaux ce qui signifie que le token expiré
        let tokenExpire = timestamp - dcurr;
        
        if(tokenExpire<=0){
          localStorage.clear();
        }
    }
  }
}