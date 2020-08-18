import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class TranslationService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};


constructor(private httpClient: HttpClient) { }

translateAllEntity(lang: string, item: string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'translation/'+lang+'/'+item);

}

addTranslation( newItem: Object) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiAdminURL+'translation_add', JSON.stringify(newItem),this.httpOptions);
}

// Type of list if true complete list if false list only of placeholders and id
simpletranslationlist(entity:string, typeOflist:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiAdminURL+'translationlist/'+entity+'/'+typeOflist);
}
  
}