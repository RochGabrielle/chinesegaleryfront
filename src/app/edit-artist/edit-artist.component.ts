import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
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
artist: {name: string, birth: number, death: number, en_gb: string, fr_fr: string, dynasty: Array<{id: number, name: string}>};
artists: Array<{name: string, birth: number, death: number, en_gb: string, fr_fr: string, dynasty: Array<{id: number, name: string}>}>;
artistForm : FormGroup;
edition: boolean = false;
dynastyList: Array<{id: number, name: string}>;

headers = ["name", "birth", "death", "en_gb", "fr_fr", "dynasty"];

constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(name: string = '', birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '', dynasty: any[] = []) {
	this.initForm(name, birth, death, en_gb, fr_fr, dynasty);
	
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

	initForm( name: string = '', birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '', dynasty: any[] = []) {

	this.elementService.simpleelementlist('dynasty').subscribe(
  (response) => {
  this.dynastyList =response;
  this.artistForm = new FormGroup({
      name: new FormControl(name),
      birth: new FormControl(birth),
      death: new FormControl(death),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
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
      formValue['birth'],
      formValue['death'],
      formValue['en_gb'],
      formValue['fr_fr'],
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
  this.artists = Object.values(response);

        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}


}
