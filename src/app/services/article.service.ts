import { Article } from '../models/Article.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';


@Injectable()
export class ArticleService {
  private articles: Article[];
  articleSubject = new Subject<Article[]>();
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};




  constructor( private httpClient: HttpClient) {
  }

  //emitArticles() {
  //  this.articleSubject.next(this.articles.slice());
  //}

  addArticle(article: FormData) : Observable<any>{
    return this.httpClient.post(GlobalConstants.apiAdminURL+'add_article', article);
  }

  articlelist() : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'articlelist');
}

simplearticlelist(entity:string) : Observable<any>{
return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'simpleArticleList/'+entity);
}


uploadFile(fd : FormData) : Observable<any> {
  return this.httpClient.post(GlobalConstants.apiAdminURL+'uploadFile', fd);
}

articleGalleryList(lang: string, type: string) : Observable<any>{
  return this.httpClient
    .get<any[]>(GlobalConstants.apiURL+'gallery/'+type+'/'+lang);
}

updateStatus(data) : Observable<any> {
  return this.httpClient.post(GlobalConstants.apiAdminURL+'status', data, this.httpOptions);
}

}