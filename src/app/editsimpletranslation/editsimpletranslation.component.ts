import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editsimpletranslation',
  templateUrl: './editsimpletranslation.component.html',
  styleUrls: ['./editsimpletranslation.component.scss']
})
export class EditsimpletranslationComponent implements OnInit {

  constructor(private router: Router, private location:Location) { }

  ngOnInit(): void {
  console.log(this.location.path());
  console.log(this.router.url);
  }

}
