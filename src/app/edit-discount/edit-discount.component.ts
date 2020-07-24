import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { DiscountService } from './../services/discount.service';
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

headers = ["placeholder", "discountrate", "en_gb", "fr_fr"];

   constructor(private router: Router, 
   				private location:Location, 
   				private discountService: DiscountService,
   				private formBuilder: FormBuilder) 
   				{ }

	edit(placeholder: string = '', discountrate: number = 0, en_gb: string = '', fr_fr: string = '') {
	this.initForm(placeholder, discountrate, en_gb, fr_fr);
	}

	add() {
  		this.initForm();
  	}

	initForm( placeholder: string = '', discountrate: number = 0,en_gb: string = '', fr_fr:string = '' ) {
    this.discountForm = new FormGroup({
      placeholder: new FormControl(placeholder),
      discountrate: new FormControl(discountrate),
      en_gb: new FormControl(en_gb),
      fr_fr: new FormControl(fr_fr)
    	});
    this.editing = true;
	}

	onSubmitForm(){
	const formValue = this.discountForm.value;
    const newDiscount = new Discount(
      formValue['placeholder'],
      formValue['discountrate'],
      formValue['en_gb'],
      formValue['fr_fr'],
    );
    console.log(JSON.stringify(newDiscount));
    this.discountService.addDiscount(newDiscount).subscribe(
  (response) => { 
  this.router.navigate([this.location.path()]);
  console.log(this.location.path());
  console.log(response);
  }
  );  
	}

  ngOnInit(): void {
  this.entity = this.location.path().slice(6);
  this.discountService.discountlist().subscribe(
  (response) => {
  this.discounts =response;    
        }
      );

  console.log(this.entity);
  console.log(this.router.url);
}


}
