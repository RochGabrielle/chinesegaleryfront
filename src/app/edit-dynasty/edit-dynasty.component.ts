import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ElementService } from './../services/element.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dynasty } from '../models/Dynasty.model';

@Component({
  selector: 'app-edit-dynasty',
  templateUrl: './edit-dynasty.component.html',
  styleUrls: ['./edit-dynasty.component.scss']
})
export class EditDynastyComponent implements OnInit {

entity: string;
dynasty: {id: number, name: string, name_fr_fr: string, name_cn_cn: string,birth: number, death: number, en_gb: string, fr_fr: string,cn_cn: string};
dynastys: Array<{id: number, name: string, name_fr_fr: string, name_cn_cn: string,birth: number, death: number, en_gb: string, fr_fr: string,cn_cn: string}>;
dynastyForm : FormGroup;
edition: boolean = false;
dynastysLoaded:boolean =false;

headers = ["name", "French", "Chinese", "Rise", "Fall", "History in English", "History in French","History in Chinese"];

   constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(id: number = 0, name: string = '', name_fr_fr: string ='', name_cn_cn: string = '',birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '',cn_cn: string) {
	this.initForm(id, name, name_fr_fr, name_cn_cn, birth, death, en_gb, fr_fr,cn_cn);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm( id: number = 0 ,name: string = '', name_fr_fr: string ='', name_cn_cn: string = '', birth: number = 0, death: number = 0, description_en_gb: string = '', description_fr_fr: string = '',description_cn_cn: string = '') {
    this.dynastyForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      name_fr_fr: new FormControl(name_fr_fr),
      name_cn_cn: new FormControl(name_cn_cn),
      birth: new FormControl(birth),
      death: new FormControl(death),
      description_en_gb: new FormControl(description_en_gb),
      description_fr_fr: new FormControl(description_fr_fr),
      description_cn_cn: new FormControl(description_cn_cn),
    	});
    this.edition = true;
	}

	onSubmitForm(){
	const formValue = this.dynastyForm.value;
    const newDynasty = new Dynasty(
      formValue['id'],
      formValue['name'],
      formValue['name_fr_fr'],
      formValue['name_cn_cn'],
      formValue['birth'],
      formValue['death'],
      formValue['description_en_gb'],
      formValue['description_fr_fr'],
      formValue['description_cn_cn'],
      this.entity
    );
     const formValues = new FormData();

    formValues.append('id', formValue['id']);
    formValues.append('name', formValue['name']);
    formValues.append('name_fr_fr', formValue['name_fr_fr']);
    formValues.append('name_cn_cn', formValue['name_cn_cn']);
    formValues.append('birth', formValue['birth']);
    formValues.append('death', formValue['death']);
    formValues.append('description_en_gb', formValue['description_en_gb']);
    formValues.append('description_fr_fr', formValue['description_fr_fr']);
    formValues.append('description_cn_cn', formValue['description_cn_cn']);
    formValues.append('entity', this.entity);

    this.elementService.addElement(formValues).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  this.router.navigate(['edit_dynasty']);
  this.edition = false; 
    this.ngOnInit();
  });
	}

  ngOnInit(): void {
    this.dynastysLoaded = false;
  this.entity = this.location.path().slice(6);
  this.elementService.elementlist(this.entity).subscribe(
  (response) => {
  this.dynastys =response;
  this.dynastysLoaded = true;     
        }
      );
}
}
