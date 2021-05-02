import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import{ GlobalConstants } from './../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  PostMessage( newItem: Object) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiContactURL, JSON.stringify(newItem),this.httpOptions);

  }
}
