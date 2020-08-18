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
translation: {placeholder: string, en_gb: string, fr_fr: string};
translations: Array<{placeholder: string, en_gb: string, fr_fr: string}>;
translationForm : FormGroup;
edition: boolean = false;

headers = ["placeholder", "en_gb", "fr_fr"];

   constructor(private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(placeholder: string = '', en_gb: string = '', fr_fr: string = '') {
	console.log("on édite!");
	this.initForm(placeholder, en_gb, fr_fr);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm( placeholder: string = '', en_gb: string = '', fr_fr: string = '') {
    this.translationForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
    	});
    this.edition = true;
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.translationForm.value;
    const newTranslation = new Simpletranslation(
      formValue['placeholder'],
      formValue['en_gb'],
      formValue['fr_fr'],
      this.entity
    );
    console.log(JSON.stringify(newTranslation));
    this.translationService.addTranslation(newTranslation).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_material']);
  console.log(this.location.path());
  }

  );
    

	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, 'true').subscribe(
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
