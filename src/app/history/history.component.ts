import { Component, OnInit } from '@angular/core';
import { ElementService } from './../services/element.service';
import{ GlobalConstants } from './../common/global-constants';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  dynastyList : Array<
  {
  id : number
  name: string, 
  birth: number, 
  death : number, 
  description: string,
  display: string
  }>;
  params: string;
  open :string = '0';
  fullDescription : boolean = false;

  constructor( private elementService : ElementService) { }



  ngOnInit(): void {

   this.params = 'dynasty/en_gb';
     this.elementService.elementListByLanguage(this.params).subscribe(
  (response) => {
  console.log(response);
  this.dynastyList = response;
        }
      ); 
  }

}
