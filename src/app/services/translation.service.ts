import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class TranslationService {

//private traduction: any[] = ['world hello!'];

constructor(private httpClient: HttpClient) { }

translate(lang: string, item: string, keyword: string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'translation/'+lang+'/'+item+'/'+keyword);
 //     .subscribe(
 //       (response) => {
 //         this.traduction = response;
 //       },
 //       (error) => {
 //         console.log('Erreur ! : ' + error);
 //         this.traduction = ['ca ne marche pas!'];
 //       }
 //     );
 //     return this.traduction;
}
  
}