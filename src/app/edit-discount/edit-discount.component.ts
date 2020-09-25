import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { TranslationService } from './../services/translation.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Discount } from '../models/Discount.model';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {

 
entity: string;
discount: {placeholder: string, discountrate: number,en_gb: string, fr_fr: string};
discounts: Array<{placeholder: string, discountrate: number,en_gb: string, fr_fr: string}>;
discountForm : FormGroup;
editing: boolean = false;

headers = ["placeholder", "discountrate", "English", "French"];

   constructor(private router: Router, 
   				private location:Location, 
   				private translationService: TranslationService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(placeholder: string = '', discountrate: number = 0, name_en_gb: string = '', name_fr_fr: string = '') {
	this.initForm(placeholder, discountrate, name_en_gb, name_fr_fr);
	}

	add() {
  		this.initForm();
  	}

	initForm( placeholder: string = '', discountrate: number = 0,name_en_gb: string = '', name_fr_fr:string = '' ) {
    this.discountForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      discountrate: new FormControl(discountrate),
      name_en_gb: new FormControl(name_en_gb),
      name_fr_fr: new FormControl(name_fr_fr)
    	});
    this.editing = true;
	}

	onSubmitForm(){
	const formValue = this.discountForm.value;
    const newDiscount = new Discount(
      formValue['placeholder'],
      formValue['discountrate'],
      formValue['name_en_gb'],
      formValue['name_fr_fr'],
      this.entity
    );
    console.log(JSON.stringify(newDiscount));
    this.translationService.addTranslation(newDiscount).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  console.log(response);
    this.ngOnInit();
  }
  );  
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.translationService.simpletranslationlist(this.entity, "full").subscribe(
  (response) => {
;
  this.discounts =response; 
  console.log('discounts:')
  console.log(this.discounts);   
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
}


}
