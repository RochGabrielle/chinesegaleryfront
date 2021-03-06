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
	themes: Array<{id: number, placeholder: string, en_gb: string, fr_fr: string, category: string, categoryId: number  }>;
	categorys:  Array<{mediaId: number, media: string}>;

	headers = ["theme", "name in english", "name in french", "category"];

  constructor( private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  	this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, 'true').subscribe(
  (response) => {
console.log(response);
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

  initForm( placeholder: string = '', en_gb: string = '', fr_fr: string = '', categoryId: number = 0 ) {

  	this.translationService.simpletranslationlist('category', 'false').subscribe(
  (response) => {
  console.log(response);
  this.categorys =response;
  console.log (this.categorys);

    this.themeForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      name_en_gb: new FormControl(en_gb),
      name_fr_fr: new FormControl(fr_fr),
      category: new FormControl(categoryId),
    	});
    this.edition = true;
	});
  }

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.themeForm.value;
    const newTheme = new Theme(
      formValue['placeholder'],
      formValue['name_en_gb'],
      formValue['name_fr_fr'],
      formValue['category'],
      this.entity
    );
    console.log(JSON.stringify(newTheme));
    this.translationService.addTranslation(newTheme).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_theme']);
  console.log(this.location.path());
  this.edition = false;
    this.ngOnInit();
  }

  );
    

	}

	edit(placeholder: string = '', en_gb: string = '', fr_fr: string = '', categoryId: number = 0) {

	this.initForm(placeholder, en_gb, fr_fr, categoryId);
	}

	add() {
  this.initForm();
  }

}
