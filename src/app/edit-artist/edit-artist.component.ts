import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Artist } from '../models/Artist.model';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {

entity: string;
artist: {name: string,name_cn: string, birth: number, death: number, en_gb: string, fr_fr: string, cn_cn: string, dynasty: Array<{id: number, name: string}>};
artists: Array<{name: string, name_cn: string,birth: number, death: number, en_gb: string, fr_fr: string, cn_cn: string,dynasty: Array<{id: number, name: string}>}>;
artistForm : FormGroup;
edition: boolean = false;
dynastyList: Array<{id: number, name: string}>;

headers = ["name", "birth", "death", "en_gb", "fr_fr", "cn_cn","dynasty"];

constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder,
          private translationService: TranslationService,
           ) 
   				{ }

	edit(name: string = '', name_cn: string = '',birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '', cn_cn: string = '',dynasty: any[] = []) {
	this.initForm(name, name_cn, birth, death, en_gb, fr_fr, cn_cn, dynasty);
	
	}

	add() {
  this.initForm();
  }

  onChange(e) {
    const dynastyChoice: FormArray = this.artistForm.get('dynastyChoice') as FormArray;

    if (e.target.checked) {
    dynastyChoice.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    dynastyChoice.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        dynastyChoice.removeAt(i);
        return;
      }
      i++;
    });
  }
  }

	initForm( name: string = '',name_cn: string = '', birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '', cn_cn: string = '',dynasty: any[] = []) {

	this.translationService.simpletranslationlist('dynasty','false').subscribe(
  (response) => {
  this.dynastyList =response;
  this.artistForm = new FormGroup({
      name: new FormControl(name),
      name_cn: new FormControl(name_cn),
      birth: new FormControl(birth),
      death: new FormControl(death),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
      cn_cn: new FormControl(cn_cn),
      dynastyChoice: new FormArray([])
    	});
    	this.artistForm.get('dynastyChoice');
    	console.log(this.artistForm.get('dynastyChoice').value);
    	
    this.edition = true;   
        }
      );
    
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.artistForm.value;
    const newArtist = new Artist(
      formValue['name'],
      formValue['name_cn'],
      formValue['birth'],
      formValue['death'],
      formValue['en_gb'],
      formValue['fr_fr'],
      formValue['cn_cn'],
      formValue['dynastyChoice'],
      this.entity
    );
    console.log(JSON.stringify(newArtist));
    this.elementService.addElement(newArtist).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  }
  );
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.elementService.elementlist(this.entity).subscribe(
  (response) => {
  console.log(Object.values(response));
  this.artists = Object.values(response);

        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}


}
