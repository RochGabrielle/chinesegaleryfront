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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


imgHomePageURL = GlobalConstants.imgHomePageURL;

  constructor(
  	private articleService : ArticleService,
    private slideService : SlideService,
  	private router : Router) { }



  ngOnInit(): void {

  }
}
