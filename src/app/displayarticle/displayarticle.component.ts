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
  artistId: string;
	description : string;
	dynasty : any[];
	bigimage : string;
  displayKeyFacts : boolean = false; 
  displayDescription : boolean = false; 

	imgSrc = GlobalConstants.imgURL;
  myThumbnail : string;
  myFullresImage : string;
  size : string;
  material : string;
  form: string;
  displayMenu: boolean = false;

  constructor(
  	public router: Router,
  	private route: ActivatedRoute) { 
  route.params.subscribe(params => {
        this.title = params['title'];
        this.artist = JSON.parse(params['artist']);
        this.bigimage = params['bigimage'];
        this.description = params['description'];
        this.size = params['size'];
        this.material = params['material'];
        this.form = params['form'];

        this.myThumbnail = this.imgSrc + "earth_1_small.png";
        this.myFullresImage = this.imgSrc + this.bigimage;
        this.artistId = this.artist[0].id;

    });
}

  ngOnInit(): void {
    let titi = 'file';
    var viewer = openSeaDragon({
      id: "openseadragon1",
      prefixUrl: "./assets/openseadragon/images/",
      tileSources: this.imgSrc + "/"+this.bigimage+"/" + this.bigimage + ".dzi",
      showNavigator:  true,
      navigatorPosition:   "BOTTOM_RIGHT",
      toolbar: "toolbarDiv",
      visibilityRatio: 1.0,
      constrainDuringPan: true,
  });
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
