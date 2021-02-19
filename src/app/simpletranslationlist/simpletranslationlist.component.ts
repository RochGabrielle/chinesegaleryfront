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
translation: {id: number, placeholder: string, name_en_gb: string, name_fr_fr: string};
translations: Array<{id: number, placeholder: string, name_en_gb: string, name_fr_fr: string}>;
translationForm : FormGroup;
edition: boolean = false;

headers = ["placeholder", "english", "french"];

   constructor(private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(id: number = 0, placeholder: string = '', name_en_gb: string = '', name_fr_fr: string = '') {
	
	this.initForm(id, placeholder, name_en_gb, name_fr_fr);
	}

	add() {
  this.initForm();
  }

	initForm( id: number = 0, placeholder: string = '', name_en_gb: string = '', name_fr_fr: string = '') {
    this.translationForm = new FormGroup({
      id: new FormControl(id),
      placeholder: new FormControl(placeholder),
      name_en_gb: new FormControl(name_en_gb),
      name_fr_fr: new FormControl(name_fr_fr),
    	});
    this.edition = true;
	}

	onSubmitForm(){

	const formValue = this.translationForm.value;
    const newTranslation = new Simpletranslation(
      formValue['id'],
      formValue['placeholder'],
      formValue['name_en_gb'],
      formValue['name_fr_fr'],
      this.entity
    );
    this.translationService.addTranslation(newTranslation).subscribe(
  (response) => { 
    this.edition = false;
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_'+this.entity]);
  this.ngOnInit()
; 
  }

  );
    

	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, "full").subscribe(
  (response) => {

  this.translations =response;
  this.edition = false;
    
        }
      );
}

//import CSV
}
