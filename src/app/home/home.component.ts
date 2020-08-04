import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ArticleService } from './../services/article.service';
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { Article } from '../models/Article.model';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

gallery : Array<{
	title: string, 
	birth: number, 
	price : number, 
	smallimage : string,
	bigimage : string,
	en_gb : string,
	fr_fr : string,
	category: any[],
	material: any[],
	discount: any[],
	artist: any[],
	dynasty: any[],
}>;
imgSrc = GlobalConstants.imgURL;

  constructor(
  	private articleService : ArticleService,
  	private router : Router) { }

  displayArticle(title :string, artist : any[], dynasty : any[], bigimage : string, description : string) {
  this.router.navigate(["/displayArticle", {title : title, 
  											 artist : JSON.stringify(artist), 
  											 dynasty : JSON.stringify(dynasty),
  											 bigimage : bigimage,
  											 description : description
  											}]);
  }

  ngOnInit(): void {

  	 this.articleService.articlelist().subscribe(
  (response) => {
  console.log(Object.values(response));
  console.log(this.imgSrc);
  this.gallery = Object.values(response);

        }
      );
  }

}
