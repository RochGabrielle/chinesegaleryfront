import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';


@Injectable()
export class StatusService {
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor( private httpClient: HttpClient) {
  }

updateStatus(data) : Observable<any> {
  return this.httpClient.post(GlobalConstants.apiAdminURL+'status', data, this.httpOptions);
}

updateHighlight(data) : Observable<any> {
  return this.httpClient.post(GlobalConstants.apiAdminURL+'highlight', data, this.httpOptions);
}

}