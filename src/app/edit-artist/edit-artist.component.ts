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
artistdynasty: any[];
toto: boolean = true;
artistsLoaded: boolean = false;

headers = ["name", "name in Chinese", "date of birth", "date of death", "biography in english", "biography in French","biography in Chinese", "dynasty"];

constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder,
          private translationService: TranslationService,
           ) 
   				{ }

	edit(name: string = '', name_cn_cn: string = '',birth: number = 0, death: number = 0, description_en_gb: string = '', description_fr_fr: string = '', description_cn_cn: string = '',dynasty: any[] = []) {
	this.initForm(name, name_cn_cn, birth, death, description_en_gb, description_fr_fr, description_cn_cn, dynasty);
	
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
  console.log(formValue['dynasty']);
  }

  private addCheckboxes() {
    console.log(this.dynastyList);
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

	initForm( name: string = '',name_cn_cn: string = '', birth: number = 0, death: number = 0, description_en_gb: string = '', description_fr_fr: string = '', description_cn_cn: string = '',dynasty: any[] = []) {
    this.artistdynasty = dynasty;

	this.translationService.simpletranslationlist('dynasty','false').subscribe(
  (response) => {
  this.dynastyList =response;
  console.log(this.dynastyList );
  console.log('dynasty:');
  console.log(dynasty);
  this.artistForm = new FormGroup({
      name: new FormControl(name),
      name_cn_cn: new FormControl(name_cn_cn),
      birth: new FormControl(birth),
      death: new FormControl(death),
      description_en_gb: new FormControl(description_en_gb),
      description_fr_fr: new FormControl(description_fr_fr),
      description_cn_cn: new FormControl(description_cn_cn),
      dynasty: new FormArray([])
    	});
    	this.artistForm.get('dynasty');
    	console.log(this.artistForm.get('dynasty').value);
      this.addCheckboxes();

      console.log(this.dynastyFormArray);
    	
    this.edition = true;   
        }
      );
    
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.artistForm.value;
  const dynastyIds = formValue.dynasty
      .map((checked, i) => checked ? this.dynastyList[i].id : null)
      .filter(v => v !== null);
      console.log('selected themes:');
    console.log(dynastyIds);
    const newArtist = new Artist(
      formValue['name'],
      formValue['name_cn_cn'],
      formValue['birth'],
      formValue['death'],
      formValue['description_en_gb'],
      formValue['description_fr_fr'],
      formValue['description_cn_cn'],
      dynastyIds,
      this.entity
    );
    console.log(JSON.stringify(newArtist));
    this.elementService.addElement(newArtist).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  this.router.navigate(['edit_artist']);
  this.edition = false; 
  }
  );
	}

  ngOnInit(): void {
    this.artistsLoaded = false;
  this.entity = this.location.path().slice(6);
  this.elementService.elementlist(this.entity).subscribe(
  (response) => {
  console.log(Object.values(response));
  this.artists = Object.values(response);
this.artistsLoaded = true;
        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}


}
