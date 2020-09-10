import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../services/translation.service';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Theme } from './../models/theme.model';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

	themeForm : FormGroup;
	edition: boolean = false;
	entity: string;
	themes: Array<{id: number, placeholder: string, en_gb: string, fr_fr: string, media: string, mediaId: number  }>;
	medias:  Array<{mediaId: number, media: string}>;

	headers = ["theme", "english", "french", "media"];

  constructor( private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  	this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, 'true').subscribe(
  (response) => {

  this.themes =response;
  
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
  }

  getSimpleList(entity: string = '') {
   this.translationService.simpletranslationlist(entity,'false').subscribe(
  (response) => {

  this[entity+'List'] =response;         
        }
      );
  }

  initForm( placeholder: string = '', en_gb: string = '', fr_fr: string = '', mediaId: number = 0 ) {

  	this.translationService.simpletranslationlist('media', 'false').subscribe(
  (response) => {
  console.log(response);
  this.medias =response;
  console.log (this.medias);

    this.themeForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
      media: new FormControl(mediaId),
    	});
    this.edition = true;
	});
  }

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.themeForm.value;
    const newTheme = new Theme(
      formValue['placeholder'],
      formValue['en_gb'],
      formValue['fr_fr'],
      formValue['media'],
      this.entity
    );
    console.log(JSON.stringify(newTheme));
    this.translationService.addTranslation(newTheme).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_theme']);
  console.log(this.location.path());
  }

  );
    

	}

	edit(placeholder: string = '', en_gb: string = '', fr_fr: string = '', mediaId: number = 0) {
	console.log("on édite!");
	this.initForm(placeholder, en_gb, fr_fr, mediaId);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

}
