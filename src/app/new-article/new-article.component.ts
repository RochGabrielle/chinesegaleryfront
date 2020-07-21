import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  //articleForm: FormGroup;
articleForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
  			  private articleService: ArticleService,
  			  private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(''),
      artist: new FormControl(''),
      theme: new FormControl(''),
      dynasty: new FormControl(''),
      material: new FormControl(''),
      discount: new FormControl(''),
      category: new FormControl(''),
    });
}

onSubmitForm() {
    const formValue = this.articleForm.value;
    const newArticle = new Article(
      formValue['title'],
      formValue['artist'],
      formValue['dynasty'],
      formValue['theme'],
      formValue['material'],
      formValue['discount'],
      formValue['price'],
      formValue['category'],

    );
    this.articleService.addArticle(newArticle);
    this.router.navigate(['/articles']);
  }
}