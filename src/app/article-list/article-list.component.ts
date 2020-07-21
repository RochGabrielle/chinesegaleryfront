import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../models/Article.model';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles: Article[];
  articleSubscription: Subscription;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleSubscription = this.articleService.articleSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    //this.articleService.emitArticles();
  }



  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }

}