import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ArticleService } from './../services/article.service';
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { SlideService } from './../services/slide.service';
import { Subscription } from 'rxjs';
import { Article } from '../models/Article.model';
import{ GlobalConstants } from './../common/global-constants';
import{ FilterPipe } from './../pipes/filter';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [
    FilterPipe]
})
export class GalleryComponent implements OnInit {

slides : Array<{
  title: string, 
  subtitle: string, 
  desktop : string,
  tablet : string,
  mobile : string,
}>;

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
  theme: any[]
}>;
gallerySave : Array<{any}>;
searchTerm:string="";
imgSrc = GlobalConstants.imgURL;
filterTerms: Array<string>=[];

  constructor(
  	private articleService : ArticleService,
    private slideService : SlideService,
    private filter : FilterPipe,
  	private router : Router) { }

  displayArticle(title :string, artist : any[], dynasty : any[], bigimage : string, description : string, material: any[], size: string) {
  console.log(artist) ;
  this.router.navigate(["/displayArticle", {title : title, 
  											 artist : JSON.stringify(artist), 
  											 dynasty : JSON.stringify(dynasty),
  											 bigimage : bigimage,
  											 description : description,
                         material: JSON.stringify(material),
                         size: size
  											}]);
  }

  onCheckChange(event) 
  {
    /* Selected */
    if(event.target.checked)
    {
      // Add a new control in the arrayForm
      this.filterTerms.push(event.target.value);
    } else 
    {
      let i = this.filterTerms.indexOf(event.target.value);
      this.filterTerms.splice(i,1);
    }
    console.log(this.filterTerms);
    this.gallery = this.filter.transform(this.gallerySave, this.searchTerm, this.filterTerms);
  }

  ngOnInit(): void {
/*
    this.slideService.slideshow('fr_fr').subscribe(
  (response) => {
    console.log("main");
  console.log(Object.values(response));
  console.log(this.imgSrc);
  this.slides = Object.values(response);

        }
      );
*/
    this.articleService.articleGalleryList('fr_fr', "gallery").subscribe(
  (response) => {
  this.gallery = Object.values(response);
  this.gallerySave = Object.values(response);
 
        }
      );  

  }
}
