import { User } from '../models/Article.model';
import { Subject } from 'rxjs/Subject';

export class ArticleService {
  private articles: Article[];
  articleSubject = new Subject<Article[]>();

  emitArticles() {
    this.articleSubject.next(this.articles.slice());
  }

  addArticle(article: Article) {
    this.articles.push(article);
    this.emitArticles();
  }
}