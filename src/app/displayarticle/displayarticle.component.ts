import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Article } from '../models/Article.model';
import{ GlobalConstants } from './../common/global-constants';
import * as openSeaDragon from 'openseadragon';
import { ArticleService } from './../services/article.service';

@Component({
  selector: 'app-displayarticle',
  templateUrl: './displayarticle.component.html',
  styleUrls: ['./displayarticle.component.scss']
})
export class DisplayarticleComponent implements OnInit {
	title : string;
	artist : any[];
  artistId: string;
	description : string;
	dynasty : any[];
	bigimage : string;
  displayKeyFacts : boolean = false; 
  displayDescription : boolean = false; 
  art: any[];

	imgSrc = GlobalConstants.imgURL;
  myThumbnail : string;
  myFullresImage : string;
  size : string;
  material : string;
  form: string;
  displayMenu: boolean = false;
  id: string;

  artworkLoading: boolean = false;


  constructor(
  	public router: Router,
    private articleService : ArticleService,
  	private route: ActivatedRoute) { 
  route.params.subscribe(params => {
        this.id = params['id'];
        
    });
}

  ngOnInit(): void {
    this.artworkLoading = false;
     this.articleService.articleDisplay(this.id, 'en_gb').subscribe(
  (response) => {
  this.art = response;
  this.title = this.art['title'];
  console.log(this.art) ;
  console.log(this.art['bigImage']);
  console.log(response);

  console.log(this.artworkLoading)
    this.artworkLoading = true;

  let titi = 'file';
    var viewer = openSeaDragon({
      id: "openseadragon1",
      prefixUrl: "./assets/openseadragon/images/",
      tileSources: this.imgSrc + "/"+this.art['bigImage']+"/" + this.art['bigImage'] + ".dzi",
      showNavigator:  true,
      navigatorPosition:   "BOTTOM_RIGHT",
      toolbar: "toolbarDiv",
      visibilityRatio: 1.0,
      constrainDuringPan: true,
  });
        }
      );
    
  }

togg() {
    this.displayMenu = !this.displayMenu;
    console.log(this.displayMenu);
}

toggKeyFacts() {
  this.displayKeyFacts = !this.displayKeyFacts;
  this.displayDescription = false;
    console.log(this.displayKeyFacts);
}

toggDescription() {
  this.displayDescription = !this.displayDescription;
  this.displayKeyFacts = false;
    console.log(this.displayDescription);
}


}
