import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class MuseumService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};


constructor(private httpClient: HttpClient) { }

addMuseum( newItem: Object) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiAdminURL+'add_museum', JSON.stringify(newItem),this.httpOptions);
}

museumlist() {
	return this.httpClient
    .get<any[]>(GlobalConstants.apiAdminURL+'museumlist');
}

}
