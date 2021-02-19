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

addElement( artist: FormData) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiAdminURL+'add_element', artist);
}

elementlist(entity:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiAdminURL+'getElementList/'+entity);
}

// params = "entity/lang"
elementListByLanguage(params:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'simpleElementList/'+params);
}

// params = "entity/lang/lan/id"
getOneElement(params : string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'getOneElement/'+params);
}

// 
checkElement(params : string) : Observable<any>{
    return this.httpClient
        .get<any[]>(GlobalConstants.apiURL+'getOneElementId/'+params);
    }
  
}