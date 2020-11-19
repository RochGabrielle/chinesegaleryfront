import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import{ GlobalConstants } from './../common/global-constants';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { BlogService } from './../services/blog.service';
import { StatusService } from './../services/status.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

headingList : Array<string> = GlobalConstants.blogHeadingList;
entity: string;
blogForm : FormGroup;
edition: boolean = false;
blogListLoaded: boolean = false;
imageSrc: string| ArrayBuffer=null;
smallImage: string| Blob;
bigImage: string| Blob;
smallImageName: string;
bigImageName: string;
blogList : Array<{
	id : number, 
    title_en_gb : string,
    title_fr_fr : string, 
    title_cn_cn : string,
    introduction_en_gb : string,
    introduction_fr_fr : string, 
    introduction_cn_cn : string,
    text_en_gb : string,
    text_fr_fr : string, 
    text_cn_cn : string,
    heading : string, 
    link : string,
    linkname : string,
    small : string,
    big : string
    }>;

headers = ["title", "heading", "status"];

  constructor(
  			private router: Router, 
   			private formBuilder: FormBuilder,
   			private location:Location,
   			private blogService: BlogService,
            private statusService: StatusService,
	) { }

  get f(){
    return this.blogForm.controls;
  }

   smallImageChange(event) {
  let me = this;
  

    me.smallImage = event.target.files[0];

    const fd = new FormData();    
  }
  
  bigImageChange(event) {
  let me = this;
  

    me.bigImage = event.target.files[0];

    const fd = new FormData();
    console.log('send file');
    
  }

  status(e) {
    var data: {[key: string]: string} = 
    {
      id: e.target.name,
      status: e.target.value,
      entity: 'blog'
    };
this.statusService.updateStatus(JSON.stringify(data)).subscribe(
  (response) => {

  }
  );
}   

edit(id : number = 0, 
     title_en_gb : string = '',
     title_fr_fr : string = '', 
     title_cn_cn : string = '',
     introduction_en_gb : string = '',
     introduction_fr_fr : string = '', 
     introduction_cn_cn : string = '',
     text_en_gb : string = '',
     text_fr_fr : string = '', 
     text_cn_cn : string = '',
     heading : string = '', 
     link : string = '',
     linkname : string = '',
     small : string = '',
     big : string = ''
     ) {
	console.log("on édite!");
	this.initForm(
				id, 
      			title_en_gb,
      			title_fr_fr, 
      			title_cn_cn,
      			introduction_en_gb,
      			introduction_fr_fr, 
      			introduction_cn_cn,
      			text_en_gb,
      			text_fr_fr, 
      			text_cn_cn,
      			heading, 
      			link,
      			linkname,
      			small,
      			big
      			);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm(
		id : number = 0, 
     	title_en_gb : string = '',
     	title_fr_fr : string = '', 
     	title_cn_cn : string = '',
     	introduction_en_gb : string = '',
     	introduction_fr_fr : string = '', 
     	introduction_cn_cn : string = '',
     	text_en_gb : string = '',
     	text_fr_fr : string = '', 
     	text_cn_cn : string = '',
     	heading : string = '', 
     	link : string = '',
     	linkname : string = '',
     	small : string = '',
     	big : string = '') {
    this.blogForm = new FormGroup({
    	id: new FormControl(id),
      title_en_gb: new FormControl( title_en_gb ),
      title_fr_fr: new FormControl( title_fr_fr ),
      title_cn_cn: new FormControl( title_cn_cn ),
      introduction_en_gb: new FormControl( introduction_en_gb ),
      introduction_fr_fr: new FormControl( introduction_fr_fr ),
      introduction_cn_cn: new FormControl( introduction_cn_cn ),
      text_en_gb: new FormControl( text_en_gb ),
      text_fr_fr: new FormControl( text_fr_fr ),
      text_cn_cn: new FormControl( text_cn_cn ),
      heading: new FormControl( heading ),
      link: new FormControl( link ),
      linkname: new FormControl( linkname ),
      smallImage: new FormControl(),
      bigImage: new FormControl()
    	});
    this.edition = true;
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.blogListLoaded = false;
  this.blogService.bloglist().subscribe(
  (response) => {

  this.blogList =response;   
  this.blogListLoaded = true; 
        }
      );

  }

  onSubmitForm(){
	const formValue = this.blogForm.value;
  console.log("envoi form");

    const formValues = new FormData();
    formValues.append('id', formValue['id']);
    formValues.append('title_en_gb', formValue['title_en_gb']);
    formValues.append('title_fr_fr', formValue['title_fr_fr']);
    formValues.append('title_cn_cn', formValue['title_cn_cn']);
    formValues.append('introduction_cn_cn', formValue['introduction_cn_cn']);
    formValues.append('introduction_en_gb', formValue['introduction_en_gb']);
    formValues.append('introduction_fr_fr', formValue['introduction_fr_fr']);
    formValues.append('text_en_gb', formValue['text_en_gb']);
    formValues.append('text_fr_fr', formValue['text_fr_fr']);   
    formValues.append('text_cn_cn', formValue['text_cn_cn']);
    formValues.append('heading', formValue['heading']);
    formValues.append('link', formValue['link']);
    formValues.append('linkname', formValue['linkname']);
    formValues.append('small', this.smallImage);
    formValues.append('big', this.bigImage);
   
    this.blogService.addBlog(formValues).subscribe(
  (response) => { 
  console.log(response);
  this.router.navigate([this.location.path()]);
  this.edition = false; 
    this.ngOnInit();
  }
  );
	}

}
