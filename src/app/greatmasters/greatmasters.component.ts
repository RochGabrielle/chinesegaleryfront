import { Component, OnInit } from '@angular/core';
import { ElementService } from './../services/element.service';
import{ GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-greatmasters',
  templateUrl: './greatmasters.component.html',
  styleUrls: ['./greatmasters.component.scss']
})
export class GreatmastersComponent implements OnInit {

	greatMasters : Array<{
  id : number
  name: string, 
  birth: number, 
  death : number, 
  smallimage : string,
  introduction : string,
}>;
  params : string;
imgSrc = GlobalConstants.imgArtistURL;
  constructor( private elementService : ElementService) { }

  ngOnInit(): void {
      this.params = 'artist/en_gb';
     this.elementService.elementListByLanguage(this.params).subscribe(
  (response) => {
  console.log(response);
  this.greatMasters = response;
        }
      ); 
  }

}
