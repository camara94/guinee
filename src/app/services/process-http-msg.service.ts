import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {
  constructor() { }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.message.substr(25, baseURL.length + 1 )}`; //`${error.status} - ${error.statusText || ''} ${error.message}`;
    }
    return throwError(errMsg);
  }
}
