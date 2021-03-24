import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Article } from '../models/Article.model';
import{ GlobalConstants } from './../common/global-constants';
import * as openSeaDragon from 'openseadragon';

@Component({
  selector: 'app-displayarticle',
  templateUrl: './displayarticle.component.html',
  styleUrls: ['./displayarticle.component.scss']
})
export class DisplayarticleComponent implements OnInit {
	title : string;
	artist : any[];
	description : string;
	dynasty : any[];
	bigimage : string;

	imgSrc = GlobalConstants.imgURL;
  myThumbnail : string;
  myFullresImage : string;


  constructor(
  	public router: Router,
  	private route: ActivatedRoute) { 
  route.params.subscribe(params => {
        this.title = params['title'];
        this.artist = JSON.parse(params['artist']);
        this.bigimage = params['bigimage'];
        this.description = params['description'];

        this.myThumbnail = this.imgSrc + "earth_1_small.png";
        this.myFullresImage = this.imgSrc + this.bigimage;

    });
}

  ngOnInit(): void {
    let titi = 'file';
    var viewer = openSeaDragon({
      id: "openseadragon1",
      prefixUrl: "./assets/openseadragon/images/",
      tileSources: this.imgSrc + "/folder/" + titi + ".dzi",
      showNavigator:  true
  });
  }


}
