import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { MuseumService } from './../services/museum.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Museum } from '../models/Museum.model';

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

headers = ["placeholder", "en_gb", "fr_fr","cn_cn","link", "linkname"];

   constructor(private router: Router, 
   				private location:Location, 
   				private museumService: MuseumService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(id: number = 0, placeholder: string = '', en_gb: string = '', fr_fr: string = '', cn_cn: string = '', link: string = '',linkname: string = '' ) {
	console.log("on édite!");
	this.initForm(id, placeholder, en_gb, fr_fr, cn_cn, );
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm(id: number = 0, placeholder: string = '', en_gb: string = '', fr_fr: string = '', cn_cn: string = '', link: string = '',linkname: string = '') {
    this.museumForm = new FormGroup({
    	id: new FormControl(id),
      placeholder: new FormControl(placeholder),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
      cn_cn: new FormControl(cn_cn),
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
      formValue['en_gb'],
      formValue['fr_fr'],
      formValue['cn_cn'],
      formValue['link'],
      formValue['linkname']
    );
    this.museumService.addMuseum(newMuseum).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_museum']);
  console.log(this.location.path());
  }
  );
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.museumService.museumlist().subscribe(
  (response) => {

  this.museums =response;    
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
}


}
