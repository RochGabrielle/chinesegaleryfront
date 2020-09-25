import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { SlideService } from './../services/slide.service';
import { StatusService } from './../services/status.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Slide } from '../models/Slide.model';

@Component({
  selector: 'app-edit-slideshow',
  templateUrl: './edit-slideshow.component.html',
  styleUrls: ['./edit-slideshow.component.scss']
})
export class EditSlideshowComponent implements OnInit {
	desktop: string| Blob;
	tablet: string| Blob;
	mobile: string| Blob;
	slideshowForm : FormGroup;
	edition: boolean = false;
	entity: string;
	slides: Array<{
		id: number, 
		title: string, 
		status: number, 
		desktop: string, 
		tablet: string, 
		mobile: string, 
		title_en_gb: string, 
		subtitle_en_gb: string, 
		title_fr_fr: string, 
		subtitle_fr_fr: string, 
		title_cn_cn: string, 
		subtitle_cn_cn: string,
	}>;
	headers = ["title", "desktop", "tablet", "mobile", "status","edit"];

  constructor(private router: Router, 
   				private location:Location, 
   				private slideService: SlideService,
   				private formBuilder: FormBuilder,
   				private statusService: StatusService
   				) { }

  ngOnInit(): void {
  	  this.entity = this.location.path().slice(6);
  this.slideService.slideList().subscribe(
  (response) => {
  this.slides = Object.values(response);

        }
      );
  }

  status(e) {
    var data: {[key: string]: string} = 
    {
      id: e.target.name,
      status: e.target.value,
      entity: 'slideshow'
    };
this.statusService.updateStatus(JSON.stringify(data)).subscribe(
  (response) => {

  }
  );
}

  edit( 
        id: number = 0, 
        title: string = '', 
        title_en_gb: string = '', 
        title_fr_fr: string = '', 
        title_cn_cn: string = '', 
        subtitle_en_gb: string = '',
        subtitle_fr_fr: string = '',
        subtitle_cn_cn: string = ''
        ) {
	this.initForm(id, title, title_en_gb, title_fr_fr, title_cn_cn, subtitle_en_gb, subtitle_fr_fr, subtitle_cn_cn);
	}

	add() {
  this.initForm( 0, '', '', '', '', '', '','');
  }

  get f(){
    return this.slideshowForm.controls;
  }

 imageChange(event) {
  let me = this;
    me.desktop = event.target.files[0];
    const fd = new FormData();    
  }
 
  initForm( id: number = 0, title: string = '', title_en_gb: string = '', title_fr_fr: string = '', title_cn_cn: string = '', subtitle_en_gb: string = '',subtitle_fr_fr: string = '', subtitle_cn_cn: string = '') {
    this.slideshowForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title),
      title_en_gb: new FormControl(title_en_gb),
      title_fr_fr: new FormControl(title_fr_fr),
      title_cn_cn: new FormControl(title_cn_cn),
      subtitle_en_gb: new FormControl(subtitle_en_gb),
      subtitle_fr_fr: new FormControl(subtitle_fr_fr),
      subtitle_cn_cn: new FormControl(subtitle_cn_cn),
      desktop: new FormControl(),
      tablet: new FormControl(),
      mobile: new FormControl(),
    	});
    this.edition = true;
	}

  onSubmitForm(){
  	 const formValue = this.slideshowForm.value;
	 const formValues = new FormData();
    formValues.append('id', formValue['id']);
    formValues.append('title', formValue['title']);
    formValues.append('title_en_gb', formValue['title_en_gb']);
    formValues.append('title_fr_fr', formValue['title_fr_fr']);
    formValues.append('title_cn_cn', formValue['title_cn_cn']);
    formValues.append('subtitle_en_gb', formValue['subtitle_en_gb']);
    formValues.append('subtitle_fr_fr', formValue['subtitle_fr_fr']);
    formValues.append('subtitle_cn_cn', formValue['subtitle_cn_cn']);
    formValues.append('desktop', this.desktop);
    formValues.append('tablet', this.tablet);
    formValues.append('mobile', this.mobile);
 this.slideService.addSlide(formValues).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_slideshow']);
  this.edition = false; 
    this.ngOnInit();
  }
  );

  const formData = new FormData();
  //  formData.append('file', this.slideshowForm.get('fileSource').value);
	}
}
