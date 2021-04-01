import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  imgContactURL = GlobalConstants.imgContactURL;

  constructor() { }

  ngOnInit(): void {
  }

}
