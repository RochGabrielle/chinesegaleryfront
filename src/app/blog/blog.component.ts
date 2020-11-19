import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from './../services/blog.service';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

 heading : string;
 lang = 'en_gb';
 blogList : Array<{
  id : number
  title: string, 
  small : string,
  introduction : string,
}>;
imgSrc = GlobalConstants.imgBlogURL;

  constructor( 
  				private blogService : BlogService,
  				private router : Router,
          private route : ActivatedRoute
  				) { }

  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    this.heading = params['heading'];

  });
 let params :string = this.heading + '/' + this.lang;
  this.blogService.blogListByHeading(params).subscribe(
  (response) => {
  this.blogList = response;
  
        }
      ); 
       
  }

}
