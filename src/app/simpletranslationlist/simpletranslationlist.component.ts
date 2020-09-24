import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Simpletranslation } from '../models/Simpletranslation.model';

@Component({
  selector: 'app-simpletranslationlist',
  templateUrl: './simpletranslationlist.component.html',
  styleUrls: ['./simpletranslationlist.component.scss']
})
export class SimpletranslationlistComponent implements OnInit {

entity: string;
translation: {placeholder: string, name_en_gb: string, name_fr_fr: string};
translations: Array<{placeholder: string, name_en_gb: string, name_fr_fr: string}>;
translationForm : FormGroup;
edition: boolean = false;

headers = ["placeholder", "english", "french"];

   constructor(private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(placeholder: string = '', name_en_gb: string = '', name_fr_fr: string = '') {
	console.log("on édite!");
	this.initForm(placeholder, name_en_gb, name_fr_fr);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm( placeholder: string = '', name_en_gb: string = '', name_fr_fr: string = '') {
    this.translationForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      name_en_gb: new FormControl(name_en_gb),
      name_fr_fr: new FormControl(name_fr_fr),
    	});
    this.edition = true;
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.translationForm.value;
    const newTranslation = new Simpletranslation(
      formValue['placeholder'],
      formValue['name_en_gb'],
      formValue['name_fr_fr'],
      this.entity
    );
    console.log(JSON.stringify(newTranslation));
    this.translationService.addTranslation(newTranslation).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_'+this.entity]);
  console.log(this.location.path());
  }

  );
    

	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, "full").subscribe(
  (response) => {

  this.translations =response;
 console.log(this.translations[0]);
 console.log(this.translations[0].placeholder);     
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
}


}
