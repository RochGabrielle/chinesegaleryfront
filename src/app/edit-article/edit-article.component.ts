import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ArticleService } from './../services/article.service';
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Article } from '../models/Article.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
entity: string;
article: {title: string, birth: number, artist: any[], dynasty: any[], price: number, discount: any[], en_gb: string, fr_fr: string, material: any[], length: number, width: number, category?: string[], theme?: string[]};
articles: Array<{title: string, birth: number, category: any[], material: any[]}>;
articlesffff: Array<{title: string, birth: number, artist: any[], dynasty: any[], price: number, material: any[], en_gb: string, fr_fr: string, discount: any[], length: number, width: number, category?: string[], theme?: string[]}>;
articleForm : FormGroup;
edition: boolean = false;
dynastyList: Array<{id: number, name: string}>;
materialList: Array<{id: number, name: string}>;
artistList: Array<{id: number, name: string}>;
categoryList: Array<{id: number, name: string}>;
themeList: Array<{id: number, name: string}>;

headers = ["title", "date of creation", "price", "category", "material"];

constructor(private router: Router, 
   				private location:Location, 
   				private articleService: ArticleService,
   				private elementService: ElementService,
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(title: string = '', birth: number = 0, price: number = 0, category:  number = 0, material:  number = 0) {
	this.initForm(title, birth, price, material, category);
	}

	add() {
  this.initForm();
  }

  dropdownchange() {};


	initForm( title: string = '', birth: number = 0, price: number = 0, material:  number = 0, category:  number = 0) {
	

	this.translationService.simpletranslationlist('category').subscribe(
  (response) => {
  console.log(response);
  this.categoryList =response;  	
      
        }
      );

      this.translationService.simpletranslationlist('material').subscribe(
  (response) => {
  console.log(response);
  this.materialList =response;


    this.edition = true;   

      this.articleForm = new FormGroup({
      title: new FormControl(title),
      birth: new FormControl(birth),
      price: new FormControl(price),
      category: new FormControl(category),
      material: new FormControl(material)
      });
        }
      );

    
    
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.articleForm.value;
    const newArticle = new Article(
      formValue['name'],
      formValue['birth'],
      formValue['price'],
      formValue['category'],
      formValue['material']
    );
    console.log(JSON.stringify(newArticle));
    this.articleService.addArticle(newArticle).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  this.router.navigate(['add_article']);
  }
  );
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.articleService.articlelist().subscribe(
  (response) => {
  console.log(Object.values(response));
  this.articles = Object.values(response);

        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}

}
