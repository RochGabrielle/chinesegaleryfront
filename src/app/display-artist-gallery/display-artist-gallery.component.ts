import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-display-artist-gallery',
  templateUrl: './display-artist-gallery.component.html',
  styleUrls: ['./display-artist-gallery.component.scss']
})
export class DisplayArtistGalleryComponent implements OnInit {

	artistGallery : Array<{
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

artworkByArtistLoading: boolean = false;

  constructor(private articleService : ArticleService,
    private slideService : SlideService,
  	private router : Router) { }


  @Input() artistId: string;

  ngOnInit(): void {
    this.artworkByArtistLoading = false;
  	 this.articleService.articleGalleryList('fr_fr', this.artistId).subscribe(
  (response) => {
  	console.log(this.artistId);
  this.artistGallery = Object.values(response);
  console.log(response);
 this.artworkByArtistLoading = true;
        }
      );  
  }



}
