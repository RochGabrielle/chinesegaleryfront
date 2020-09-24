import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { MuseumService } from './../services/museum.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Museum } from '../models/Museum.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.scss']
})
export class MuseumComponent implements OnInit {

entity: string;
museum: {id: number, placeholder: string, en_gb: string, fr_fr: string, cn_cn: string, link: string, linkname: string };
museums: Array<{id : number, placeholder: string, en_gb: string, fr_fr: string, museumForm}>;
museumForm : FormGroup;
edition: boolean = false;
museumsLoaded: boolean = false;

headers = ["placeholder", "name in English", "name in French","name in Chinese","link", "linkname"];

   constructor(private router: Router, 
   				private location:Location, 
   				private museumService: MuseumService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(id: number = 0, placeholder: string = '', en_gb: string = '', fr_fr: string = '', cn_cn: string = '', link: string = '',linkname: string = '' ) {
	console.log("on édite!");
	this.initForm(id, placeholder, en_gb, fr_fr, cn_cn, link, linkname);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm(id: number = 0, placeholder: string = '', name_en_gb: string = '', name_fr_fr: string = '', name_cn_cn: string = '', link: string = '',linkname: string = '') {
    this.museumForm = new FormGroup({
    	id: new FormControl(id),
      placeholder: new FormControl(placeholder),
      name_en_gb: new FormControl(name_en_gb),
      name_fr_fr: new FormControl(name_fr_fr),
      name_cn_cn: new FormControl(name_cn_cn),
      link: new FormControl(link),
      linkname: new FormControl(linkname),
    	});
    this.edition = true;
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.museumForm.value;
    const newMuseum = new Museum(
    	formValue['id'],
      formValue['placeholder'],
      formValue['name_en_gb'],
      formValue['name_fr_fr'],
      formValue['name_cn_cn'],
      formValue['link'],
      formValue['linkname']
    );
    this.museumService.addMuseum(newMuseum).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_museum']);
  console.log(this.location.path());
  this.edition = false;
  }
  );
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.museumsLoaded = false;
  this.museumService.museumlist().subscribe(
  (response) => {

  this.museums =response;   
  this.museumsLoaded = true; 
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
}


}
