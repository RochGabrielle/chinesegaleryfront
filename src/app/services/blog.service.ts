import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';


@Injectable()
export class BlogService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};


constructor(private httpClient: HttpClient) { }

addBlog( blog: FormData) {
return this.httpClient
    .post<any[]>(GlobalConstants.apiAdminURL+'add_blog', blog);
}

bloglist(heading : string = 'all') : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiAdminURL+'getBlogList/' + heading);
}

// params : heading/lang
blogListByHeading(params : string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'blogListByHeading/'+params);
}

// params : lang/id
getOneBlog(params : string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'getOneBlog/'+params);
}

  
}