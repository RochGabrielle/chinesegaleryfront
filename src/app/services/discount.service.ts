import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class DiscountService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};

//private traduction: any[] = ['world hello!'];

constructor(private httpClient: HttpClient) { }

addDiscount( newItem: Object) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiURL+'add_discount', JSON.stringify(newItem),this.httpOptions);
}

discountlist() : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'discountlist');
}
  
}