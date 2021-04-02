import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  imgContactURL = GlobalConstants.imgContactURL;

  constructor() { }

  ngOnInit(): void {
  }

}
