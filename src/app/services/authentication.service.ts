import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from './../shared/modeles/user';
import { baseURL } from './../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn?: boolean;
  private token?: any;
  public user: any;
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { 
    if(localStorage.getItem('token') != undefined) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
  setLoggedIn(loggedIn: boolean, token?: any) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  login(compte: any): Observable<any> {
    return this.httpClient.post<any>(baseURL + 'auth/login', compte);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigateByUrl('/login');
  }

  isAdmin(): boolean {
    var admin: boolean = false;
    const roles = localStorage.getItem('roles')?.toString().split(',');

    roles?.forEach(r => {
      if (r == 'ADMIN') {
        admin = true;
      }
    });
    return admin;
  }

  createCompte(compte: User): Observable<User> {
    return this.httpClient.post<User>(baseURL + 'auth/register', compte);
  }
  verifyCompte(compte?: User): Observable<any> {
    return this.httpClient.post<any>(baseURL + 'auth/verify-user', compte);
  }
  verifyEmail(email?: string): Observable<any> {
    return this.httpClient.get<any>(baseURL + 'auth/verify-email/' + email);
  }

  resetPassword(idUser: string, compte?: User): Observable<any> {
    return this.httpClient.put<any>(baseURL + 'auth/reset-password/' + idUser, compte);
  }

  getCompteById(idCompte?: string): Observable<User> {
    return this.httpClient.get<User>(baseURL + 'auth/users/' + idCompte);
  }

  deleteCompteById(idCompte?: string): Observable<User> {
    return this.httpClient.delete<User>(baseURL + 'auth/users/' + idCompte);
  }

  updateCompte(compte: User ): Observable<User> {
    return this.httpClient.put<User>( baseURL + 'auth/users', compte);
  }

  //Les methodes de création ici
  public telecharger(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('avatar', file);
    return this.httpClient.put<any>(baseURL + "auth/avatar", formData);
  }

  aouth2Facebook(user: any): Observable<any> {
    return this.httpClient.post<any>(baseURL + 'auth/facebook-aouth2', user);
  }

  aouth2Google(user: any): Observable<any> {
    return this.httpClient.post<any>(baseURL + 'auth/google-aouth2', user);
  }
}