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

  addArticle(article: Article) : Observable<any>{
    return this.httpClient.post(GlobalConstants.apiURL+'article_add', article, this.httpOptions);
  }
}