import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from './../shared/modeles/region';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private httpClient: HttpClient) { }

  getAllRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(baseURL + 'regions')
  }

  getRegionId(id: string): Observable<Region> {
    return this.httpClient.get<Region>(baseURL + 'regions/' + id)
  }

  addRegion(Region: Region): Observable<Region> {
    return this.httpClient.post<Region>(baseURL + 'regions/', Region)
  }

}

