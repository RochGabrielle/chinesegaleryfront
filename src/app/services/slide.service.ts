import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class SlideService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};

constructor(private httpClient: HttpClient) { }

addSlide(slide: FormData) : Observable<any>{
    return this.httpClient.post(GlobalConstants.apiAdminURL+'add_slide', slide);
  }

// Type of list if true complete list if false list only of placeholders and id
slideList() : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'slideList');
}

slideshow(lang: string): Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'slideshow/'+lang);
}

}