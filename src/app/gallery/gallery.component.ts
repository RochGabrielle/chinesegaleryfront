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
  styleUrls: ['./gallery.component.scss']
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
searchTerm:string="";
imgSrc = GlobalConstants.imgURL;

  constructor(
  	private articleService : ArticleService,
    private slideService : SlideService,
    private filter : FilterPipe,
  	private router : Router) { }

  displayArticle(title :string, artist : any[], dynasty : any[], bigimage : string, description : string) {
  console.log(artist) ;
  this.router.navigate(["/displayArticle", {title : title, 
  											 artist : JSON.stringify(artist), 
  											 dynasty : JSON.stringify(dynasty),
  											 bigimage : bigimage,
  											 description : description
  											}]);
  }

filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  console.log(x);
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    this.w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "show");
  }
}

// Show filtered elements
 w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
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
  let element:HTMLElement = document.getElementById('selectAll') as HTMLElement;
console.log(this.gallery);
element.click()
        }
      );  

  }
}
