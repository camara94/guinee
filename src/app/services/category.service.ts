import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './../shared/modeles/category';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpHclient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpHclient.get<Category[]>(baseURL + 'categories')
  }

  getCategoryId(id: string): Observable<Category> {
    return this.httpHclient.get<Category>(baseURL + 'categories/' + id)
  }
}
