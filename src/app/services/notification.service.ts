import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from './../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
    constructor(private httpClient: HttpClient) { }
  
    getNotification(): Observable<Notification[]> {
      return this.httpClient.get<Notification[]>(baseURL + 'notifications')
    }

    getNotificationById(id: string): Observable<Notification> {
      return this.httpClient.get<Notification>(baseURL + 'notifications/' + id);
    }
  
    ajouterNotification(id: string): Observable<Notification> {
      return this.httpClient.get<Notification>(baseURL + 'commandes/notifications-guinee/' + id);
    }
  
    lireNotification(id: string): Observable<Notification> {
      return this.httpClient.get<Notification>(baseURL + 'notifications' + id);
    }
  
    
  
  }
  