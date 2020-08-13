import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class ElementService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};

//private traduction: any[] = ['world hello!'];

constructor(private httpClient: HttpClient) { }

addElement( newItem: Object) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiAdminURL+'add_element', JSON.stringify(newItem),this.httpOptions);
}

elementlist(entity:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'getElementList/'+entity);
}

simpleelementlist(entity:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'simpleElementList/'+entity);
}

  
}