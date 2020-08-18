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
dynasty: {name: string, name_cn: string,birth: number, death: number, en_gb: string, fr_fr: string,cn_cn: string};
dynastys: Array<{name: string, name_cn: string,birth: number, death: number, en_gb: string, fr_fr: string,cn_cn: string}>;
dynastyForm : FormGroup;
edition: boolean = false;

headers = ["name", "birth", "death", "en_gb", "fr_fr","cn_cn"];

   constructor(private router: Router, 
   				private location:Location, 
   				private elementService: ElementService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(name: string = '', name_cn: string = '',birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '',cn_cn: string) {
	this.initForm(name, name_cn, birth, death, en_gb, fr_fr,cn_cn);
	}

	add() {console.log("on ajoute!");
  this.initForm();
  }

	initForm( name: string = '',name_cn: string = '', birth: number = 0, death: number = 0, en_gb: string = '', fr_fr: string = '',cn_cn: string = '') {
    this.dynastyForm = new FormGroup({
      name: new FormControl(name),
      name_cn: new FormControl(name_cn),
      birth: new FormControl(birth),
      death: new FormControl(death),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr),
      cn_cn: new FormControl(cn_cn),
    	});
    this.edition = true;
	}

	onSubmitForm(){
	console.log('helloesss');
	const formValue = this.dynastyForm.value;
    const newDynasty = new Dynasty(
      formValue['name'],
      formValue['name_cn'],
      formValue['birth'],
      formValue['death'],
      formValue['en_gb'],
      formValue['fr_fr'],
      formValue['cn_cn'],
      this.entity
    );
    console.log(JSON.stringify(newDynasty));
    this.elementService.addElement(newDynasty).subscribe(
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
  this.dynastys =response;
 console.log(this.dynastys[0]);
 console.log(this.dynastys[0].name);     
        }
      );
  console.log(this.entity);
  console.log(this.router.url);
}


}
