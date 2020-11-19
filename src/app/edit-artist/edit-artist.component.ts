import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Artist } from '../models/Artist.model';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {

entity: string;
artist: {name: string,name_cn: string, birth: string, death: string, en_gb: string, fr_fr: string, cn_cn: string, dynasty: Array<{id: number, name: string}>};
artists: Array<{id: number, name: string, name_cn: string,birth: string, death: string, en_gb: string, fr_fr: string, cn_cn: string,dynasty: Array<{id: number, name: string}>}>;
artistForm : FormGroup;
edition: boolean = false;
dynastyList: Array<{id: number, name: string}>;
artistdynasty: any[];
toto: boolean = true;
artistsLoaded: boolean = false;
imageSrc: string| ArrayBuffer=null;
smallImage: string| Blob;
bigImage: string| Blob;
smallImageName: string;
bigImageName: string;

headers = ["name", "name in Chinese", "date of birth", "date of death", "biography in english", "biography in French","biography in Chinese", "dynasty"];

constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder,
          private translationService: TranslationService,
           ) 
   				{ }

	edit(
  id: number = 0, 
  name: string = '', 
  name_cn_cn: string = '',
  birth: string = 'unknown', 
  death: string = 'unknown', 
  introduction_en_gb: string = '', 
  introduction_fr_fr: string = '', 
  introduction_cn_cn: string = '', 
  description_en_gb: string = '', 
  description_fr_fr: string = '', 
  description_cn_cn: string = '',
  dynasty: any[] = [],
  small: string = '',
  big: string = ''

  ) {
       this.smallImageName = small;
       this.bigImageName = big;
	     this.initForm(
        id, 
        name, 
        name_cn_cn, 
        birth, 
        death, 
        introduction_en_gb, 
        introduction_fr_fr, 
        introduction_cn_cn, 
        description_en_gb, 
        description_fr_fr, 
        description_cn_cn, 
        dynasty
        );
	}

	add() {
  this.initForm();
  }

  onChange(e) {
    const dynastyChoice: FormArray = this.artistForm.get('dynasty') as FormArray;

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
  const formValue = this.artistForm.value;
  }

  private addCheckboxes() {
    this.dynastyList.forEach((e) => {
      const artistdynastyid = this.artistdynasty.map(x => x.id);
      this.dynastyFormArray.push(new FormControl(artistdynastyid.includes((e.id))));
  }
  );
}

  get dynastyFormArray() {
    return this.artistForm.controls.dynasty as FormArray;
  }

  get f(){
    return this.artistForm.controls;
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

	initForm( id: number = 0, name: string = '',name_cn_cn: string = '', birth: string = 'unknown', death:string = 'unknown', introduction_en_gb: string = '', introduction_fr_fr: string = '', introduction_cn_cn: string = '', description_en_gb: string = '', description_fr_fr: string = '', description_cn_cn: string = '',dynasty: any[] = []) {
    this.artistdynasty = dynasty;

	this.translationService.simpletranslationlist('dynasty','false').subscribe(
  (response) => {
  this.dynastyList =response;
  this.artistForm = new FormGroup({
      id : new FormControl(id),
      name: new FormControl(name),
      name_cn_cn: new FormControl(name_cn_cn),
      birth: new FormControl(birth),
      death: new FormControl(death),
      introduction_en_gb: new FormControl(introduction_en_gb),
      introduction_fr_fr: new FormControl(introduction_fr_fr),
      introduction_cn_cn: new FormControl(introduction_cn_cn),
      description_en_gb: new FormControl(description_en_gb),
      description_fr_fr: new FormControl(description_fr_fr),
      description_cn_cn: new FormControl(description_cn_cn),
      dynasty: new FormArray([]),
      smallImage: new FormControl(),
      bigImage: new FormControl(),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    	});
    	this.artistForm.get('dynasty');
      this.addCheckboxes();
    	
    this.edition = true;   
        }
      );
    
	}

	onSubmitForm(){
	const formValue = this.artistForm.value;
  console.log("envoi form");
  const dynastyIds = formValue.dynasty
      .map((checked, i) => checked ? this.dynastyList[i].id : null)
      .filter(v => v !== null);

    const formValues = new FormData();
    formValues.append('id', formValue['id']);
    formValues.append('name', formValue['name']);
    formValues.append('name_en_gb', formValue['name']);
    formValues.append('name_cn_cn', formValue['name_cn_cn']);
    formValues.append('name_fr_fr', formValue['name']);
    formValues.append('birth', formValue['birth']);
    formValues.append('death', formValue['death']);
    formValues.append('introduction_en_gb', formValue['introduction_en_gb']);
    formValues.append('introduction_fr_fr', formValue['introduction_fr_fr']);
    formValues.append('introduction_cn_cn', formValue['introduction_cn_cn']);
    formValues.append('description_en_gb', formValue['description_en_gb']);
    formValues.append('description_fr_fr', formValue['description_fr_fr']);
    formValues.append('description_cn_cn', formValue['description_cn_cn']);
    formValues.append('entity', this.entity);
    formValues.append('dynasty', dynastyIds);
    formValues.append('small', this.smallImage);
    formValues.append('big', this.bigImage);
   
    this.elementService.addElement(formValues).subscribe(
  (response) => { 
  console.log(response);
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_artist']);
  this.edition = false; 
    this.ngOnInit();
  }
  );
	}

  ngOnInit(): void {
    this.artistsLoaded = false;
  this.entity = this.location.path().slice(6);
  this.elementService.elementlist(this.entity).subscribe(
  (response) => {
  this.artists = Object.values(response);
this.artistsLoaded = true;
        }
      );
}


}
