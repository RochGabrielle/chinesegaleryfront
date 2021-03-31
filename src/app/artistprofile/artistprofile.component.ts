import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ElementService } from './../services/element.service';
import { ArticleService } from './../services/article.service';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-artistprofile',
  templateUrl: './artistprofile.component.html',
  styleUrls: ['./artistprofile.component.scss']
})
export class ArtistprofileComponent implements OnInit {
artistId : string;
imgSrc = GlobalConstants.imgArtistURL;
artistLoaded: boolean = false;

artist : {
  name: string, 
  birth: number, 
  death : number, 
  smallimage : string,
  bigimage : string,
  description : string,
  dynasty: any[]
  };

paintingList : Array<{
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
  dynasty: any[]
  }>;

lang : string = "en_gb";

  constructor( 
      private route: ActivatedRoute,
      private elementService : ElementService,
      private articleService : ArticleService,
      private router : Router
      ) { }

   displayArticle(title :string, artist : any[], dynasty : any[], bigimage : string, description : string) {
  this.router.navigate(["/displayArticle", {title : title, 
  											 artist : JSON.stringify(artist), 
  											 dynasty : JSON.stringify(dynasty),
  											 bigimage : bigimage,
  											 description : description
  											}]);
  }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.artistId = params['artist'];

  });
  console.log(this.lang);
  console.log(this.artistId);
 let params :string = 'artist' + '/' + this.lang +'/'+this.artistId;
 console.log(params);
  this.elementService.getOneElement(params).subscribe(
  (response) => {
  console.log('toto');
  console.log(response);
  this.artist = response;
  console.log(this.artist);
  console.log(this.artist);
  this.artistLoaded = true;
        }
      ); 
   this.articleService.paintingListOfArtist(this.artistId, this.lang).subscribe(
  (response) => {
  this.paintingList = Object.values(response);
        }
      ); 
  }



}
